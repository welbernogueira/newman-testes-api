const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'postman', 'Omnidelicias-API.postman_collection.json');
const suitePath = path.join(root, 'postman', 'Omnidelicias-Happy-Paths.postman_collection.json');
const catalogPath = path.join(root, 'docs', 'ENDPOINT-CATALOG.md');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const excluded = /(\b[45]\d\d\b|inv[aá]lid|inexist|outra empresa|malform|duplic|sem (?:id|token|equipe|respons|permiss|campo|data|categoria)|não|nao |fora da|vazio|inativo|negad|erro|ausente|incomplet|invertid|proib|zero =|nao positivo)/i;
const statusTest = [
  "pm.test('HTTP status 2xx', function () {",
  '    pm.expect(pm.response.code).to.be.within(200, 299);',
  '});'
].join('\n');

function normalizeUrl(raw) {
  const withoutBase = String(raw || '').replace('{{baseUrl}}', '');
  const pathOnly = withoutBase.split('?')[0];
  return pathOnly.split('/').map((segment, index, parts) => {
    if (parts[index - 1] === 'por-numero') return '{idTicket}';
    return /^\d+$/.test(segment) ? '{id}' : segment;
  }).join('/');
}

function visit(items, folder, out) {
  for (const item of items || []) {
    if (item.request) {
      const key = `${item.request.method} ${normalizeUrl(item.request.url?.raw)}`;
      if (!out.has(key)) out.set(key, []);
      out.get(key).push({ item, folder, key });
    } else if (item.item) visit(item.item, folder, out);
  }
}

const candidates = new Map();
for (const folder of source.item || []) visit(folder.item, folder.name, candidates);

const selected = [];
const uncovered = [];
for (const [key, choices] of candidates) {
  const positives = choices.filter((x) => !excluded.test(x.item.name));
  if (!positives.length) {
    uncovered.push({ key, choices });
    continue;
  }
  positives.sort((a, b) => {
    const score = (x) => (/(Criar|Consultar|Listar|Gerar|Buscar|Obter|Alterar|Atualizar|Enviar|Executar|Token obtido)/i.test(x.item.name) ? 0 : 1);
    return score(a) - score(b);
  });
  selected.push(positives[0]);
}

selected.sort((a, b) => {
  const ai = source.item.findIndex((x) => x.name === a.folder);
  const bi = source.item.findIndex((x) => x.name === b.folder);
  return ai - bi || a.key.localeCompare(b.key);
});

const folders = new Map();
selected.forEach((entry, index) => {
  const item = JSON.parse(JSON.stringify(entry.item));
  item.name = `[HP-${String(index + 1).padStart(3, '0')}] ${item.name}`;
  item.event = item.event || [];
  let tests = item.event.find((event) => event.listen === 'test');
  if (!tests) {
    tests = { listen: 'test', script: { type: 'text/javascript', exec: [] } };
    item.event.push(tests);
  }
  tests.script.exec.push(statusTest);
  if (!folders.has(entry.folder)) folders.set(entry.folder, []);
  folders.get(entry.folder).push(item);
});

const suite = {
  info: {
    _postman_id: source.info?._postman_id,
    name: 'Omnidelicias API - Happy Paths',
    description: 'Seleção inicial de um cenário positivo por método e rota, derivada da collection original. Cada request valida HTTP 2xx. Revisar massa de dados e pré-condições antes de habilitar mutações; esta seleção ainda não substitui assertions específicas de contrato.',
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
  },
  auth: source.auth,
  variable: source.variable || [],
  item: [...folders.entries()].map(([name, item]) => ({ name, item }))
};
fs.writeFileSync(suitePath, `${JSON.stringify(suite, null, 2)}\n`);

const rows = selected.map((x, i) => {
  const method = x.item.request.method;
  const action = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) ? 'Mutação: validar massa/limpeza antes de executar' : 'Leitura';
  return `| HP-${String(i + 1).padStart(3, '0')} | ${method} | \`${normalizeUrl(x.item.request.url?.raw)}\` | ${x.folder} | ${x.item.name.replaceAll('|', '\\|')} | ${action} |`;
});
const uncoveredRows = uncovered.map((x) => `| ${x.key} | ${x.choices.map((v) => v.item.name.replaceAll('|', '\\|')).join('<br>')} |`);
const markdown = [
  '# Catálogo inicial de endpoints e happy paths',
  '',
  `Inventário gerado da collection original em ${new Date().toISOString().slice(0, 10)}. Rotas agrupadas por método e template de caminho; query strings não criam endpoints separados. Foram selecionados ${selected.length} happy paths candidatos entre ${candidates.size} combinações método/rota. A seleção usa o nome do request para excluir cenários explicitamente negativos; confirme cada massa e cada resposta com o contrato da API.`,
  '',
  'A suite valida inicialmente apenas o status HTTP 2xx. Os testes de contrato, pré-condições e limpeza serão detalhados por endpoint na próxima rodada. Requests de escrita estão identificados e não devem ser executados até terem massa isolada e limpeza definida.',
  '',
  '| ID | Método | Rota | Pasta | Cenário fonte | Execução |',
  '|---|---|---|---|---|---|',
  ...rows,
  '',
  `## Rotas sem candidato positivo (${uncovered.length})`,
  '',
  '| Método e rota | Requests encontrados |',
  '|---|---|',
  ...(uncoveredRows.length ? uncoveredRows : ['| Nenhuma | — |']),
  ''
].join('\n');
fs.writeFileSync(catalogPath, markdown);
console.log(`Happy paths selecionados: ${selected.length}/${candidates.size}; sem candidato: ${uncovered.length}`);
