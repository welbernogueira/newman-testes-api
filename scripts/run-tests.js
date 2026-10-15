const fs = require('node:fs');
const path = require('node:path');
const newman = require('newman');
const { redactJsonReport, redactHtmlReport } = require('./redact-report');

const root = path.resolve(__dirname, '..');
const sourceCollection = path.join(root, 'postman', 'Omnidelicias-API.postman_collection.json');
const happyCollection = path.join(root, 'postman', 'Omnidelicias-Happy-Paths.postman_collection.json');
const reports = path.join(root, 'reports');
const group = process.argv[2] || 'all';
const validGroups = new Set(['all', 'smoke', 'auth', 'crud', 'negative', 'regression', 'smtp', 'smtp-happy', 'happy', 'happy-read']);
if (!validGroups.has(group)) {
  console.error(`Grupo inválido: ${group}. Use: ${[...validGroups].join(', ')}`);
  process.exit(2);
}

const smtpHappyCollection = path.join(root, 'postman', 'Omnidelicias-SMTP-Happy-Path.postman_collection.json');
const selectedCollection = ['happy', 'happy-read'].includes(group) ? happyCollection : group === 'smtp-happy' ? smtpHappyCollection : sourceCollection;
if (!fs.existsSync(selectedCollection)) {
  console.error(`Collection não encontrada: ${path.relative(root, selectedCollection)}`);
  process.exit(2);
}
const parsed = JSON.parse(fs.readFileSync(selectedCollection, 'utf8'));
if (countRequests(parsed.item || []) === 0) {
  console.error('Nenhum request encontrado na collection selecionada.');
  process.exit(2);
}

const envPath = process.env.POSTMAN_ENV;
if (['smtp', 'smtp-happy', 'happy', 'happy-read'].includes(group) && !envPath) {
  console.error('Este grupo exige POSTMAN_ENV apontando para o environment OMNIDESK exportado do Postman.');
  process.exit(2);
}
if (['happy', 'smtp', 'smtp-happy'].includes(group) && String(process.env.ALLOW_DESTRUCTIVE || '').toLowerCase() !== 'true') {
  console.error('A suite inclui operações de escrita. Defina ALLOW_DESTRUCTIVE=true somente após revisar massa de teste e limpeza.');
  process.exit(2);
}
if (group === 'all' && String(process.env.ALLOW_DESTRUCTIVE || '').toLowerCase() !== 'true') {
  console.error('A collection original inclui operações de escrita. Defina ALLOW_DESTRUCTIVE=true somente após revisar o escopo do ambiente.');
  process.exit(2);
}
if (['happy', 'smtp'].includes(group) && String(process.env.HAPPY_PATH_FIXTURES_READY || '').toLowerCase() !== 'true') {
  console.error('Os requests mutáveis ainda dependem de IDs/massa estáticos. Defina HAPPY_PATH_FIXTURES_READY=true somente após substituir fixtures e revisar a limpeza.');
  process.exit(2);
}

if (group === 'happy-read') {
  const login = findRequest(parsed.item, (item) => item.name.includes('POST /oauth/login'));
  const reads = filterFolders(parsed.item, (item) => item.request?.method === 'GET' && !/events\/stream/i.test(item.request.url?.raw || ''));
  parsed.item = [login ? { name: 'Autenticação', item: [login] } : null, ...reads].filter(Boolean);
}

fs.mkdirSync(reports, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const jsonReport = path.join(reports, `${group}-${stamp}.json`);
const htmlReport = path.join(reports, `${group}-${stamp}.html`);
const options = {
  collection: parsed,
  reporters: ['json', 'htmlextra'],
  reporter: {
    json: { export: jsonReport },
    htmlextra: {
      export: htmlReport,
      title: `Omnidelicias API - ${group}`,
      showOnlyFails: false,
      skipSensitiveData: true,
      skipEnvironmentVars: getEnvironmentKeys(envPath)
    }
  },
  timeoutRequest: Number(process.env.REQUEST_TIMEOUT_MS || 10000),
  bail: false,
  color: 'on'
};
if (envPath) {
  const resolved = path.resolve(envPath);
  if (!fs.existsSync(resolved)) {
    console.error(`Environment não encontrado: ${resolved}`);
    process.exit(2);
  }
  options.environment = resolved;
}
options.envVar = [];
for (const [key, value] of [
  ['baseUrl', process.env.BASE_URL],
  ['username', process.env.TEST_USERNAME],
  ['password', process.env.TEST_PASSWORD],
  ['allowDestructive', process.env.ALLOW_DESTRUCTIVE],
  ['responseTimeLimitMs', process.env.RESPONSE_TIME_LIMIT_MS]
]) {
  if (value !== undefined && value !== '') options.envVar.push({ key, value, type: 'default' });
}
if (group === 'smtp-happy') {
  options.envVar.push(
    { key: 'smtpTestIdEmpresa', value: process.env.SMTP_TEST_ID_EMPRESA || '1', type: 'default' },
    { key: 'smtpTestRunId', value: `run-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, type: 'default' },
    { key: 'smtpTestPassword', value: `QaSmtp#${Date.now()}!`, type: 'default' }
  );
}
if (group === 'smtp') options.folder = 'Omnidesk - Configurações SMTP';
else if (!['all', 'happy', 'happy-read', 'smtp-happy'].includes(group)) options.folder = group;

let completedRequests = 0;
const run = newman.run(options, (err, summary) => {
  if (err) {
    console.error('Erro ao executar Newman:', err.message);
    process.exitCode = 1;
    return;
  }
  redactJsonReport(jsonReport, envPath);
  redactHtmlReport(htmlReport, envPath);
  const failures = summary.run.stats.assertions.failed + summary.run.stats.tests.failed;
  console.log(`Relatórios: ${jsonReport} e ${htmlReport}`);
  console.log(`Requisições: ${summary.run.stats.requests.total}; falhas: ${summary.run.stats.requests.failed}; assertions com falha: ${summary.run.stats.assertions.failed}`);
  if (summary.run.failures.length || failures > 0 || summary.run.stats.requests.failed > 0) process.exitCode = 1;
});
run.on('request', () => {
  completedRequests += 1;
  if (completedRequests % 10 === 0) console.log(`Progresso: ${completedRequests} requests concluídos.`);
});

function countRequests(items) {
  return items.reduce((n, item) => n + (item.request ? 1 : 0) + (Array.isArray(item.item) ? countRequests(item.item) : 0), 0);
}
function filterFolders(items, predicate) {
  return (items || []).map((item) => {
    if (item.request) return predicate(item) ? item : null;
    const children = filterFolders(item.item, predicate);
    return children.length ? { ...item, item: children } : null;
  }).filter(Boolean);
}
function findRequest(items, predicate) {
  for (const item of items || []) {
    if (item.request && predicate(item)) return item;
    const nested = findRequest(item.item, predicate);
    if (nested) return nested;
  }
  return null;
}
function getEnvironmentKeys(file) {
  if (!file || !fs.existsSync(path.resolve(file))) return [];
  try {
    const environment = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
    return (environment.values || []).map((variable) => variable.key);
  } catch {
    return [];
  }
}
