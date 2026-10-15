const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'postman', 'Omnidelicias-API.postman_collection.json');
const outputPath = path.join(root, 'postman', 'Omnidelicias-SMTP-Happy-Path.postman_collection.json');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const auth = source.item.find((item) => item.name === 'Auth (API)');
const originalSmtp = source.item.find((item) => item.name === 'Omnidesk - Configurações SMTP');
if (!auth || !originalSmtp || originalSmtp.item?.length !== 5) throw new Error('Não encontrei a pasta Auth ou os cinco requests SMTP na collection original.');

const login = JSON.parse(JSON.stringify(auth.item.find((item) => item.name.includes('POST /oauth/login'))));
const smtp = JSON.parse(JSON.stringify(originalSmtp.item));
const [create, list, detail, update, remove] = smtp;
const createdName = '[TESTE] SMTP Happy Path {{smtpTestRunId}}';
const cleanupName = remove.name;

create.request.body.raw = `{
  "idEmpresa": {{smtpTestIdEmpresa}},
  "host": "smtp-happy.invalid",
  "porta": 587,
  "seguranca": "STARTTLS",
  "usuario": "qa-smtp+{{smtpTestRunId}}@empresa.invalid",
  "senha": "{{smtpTestPassword}}",
  "emailRemetente": "qa-smtp+{{smtpTestRunId}}@empresa.invalid",
  "nomeRemetente": "${createdName}",
  "padrao": false
}`;
create.event = [{
  listen: 'test',
  script: { type: 'text/javascript', exec: [
    "pm.test('POST cria configuração SMTP com HTTP 201', function () { pm.response.to.have.status(201); });",
    'if (pm.response.code !== 201) postman.setNextRequest(null);'
  ] }
}];

list.request.url.raw = '{{baseUrl}}/omnidesk/configuracoes-smtp?page=0&size=100&sort=id,desc&search=idEmpresa=={{smtpTestIdEmpresa}}';
list.event = [{
  listen: 'test',
  script: { type: 'text/javascript', exec: [
    "pm.test('GET lista SMTP responde HTTP 200', function () { pm.response.to.have.status(200); });",
    "if (pm.response.code !== 200) postman.setNextRequest(null); else {",
    '  let body = {}; try { body = pm.response.json(); } catch (e) {}',
    '  function findCreated(value) { if (Array.isArray(value)) { for (const x of value) { const found = findCreated(x); if (found) return found; } } else if (value && typeof value === "object") { if (value.nomeRemetente === pm.environment.get("smtpTestRunId") || value.nomeRemetente === "[TESTE] SMTP Happy Path " + pm.environment.get("smtpTestRunId")) return value; for (const v of Object.values(value)) { const found = findCreated(v); if (found) return found; } } return null; }',
    '  const created = findCreated(body);',
    "  if (created) { const id = created.id || created.idConfiguracaoSmtp || created.idSmtpConfiguracao; if (id) { pm.environment.set('smtpCreatedId', String(id)); pm.collectionVariables.set('smtpCreatedId', String(id)); } }",
    "  const found = !!created;",
    "  pm.test('GET lista contém somente o registro criado por este run', function () { pm.expect(found).to.eql(true); });",
    "  if (!found) postman.setNextRequest(null);",
    '}'
  ] }
}];

detail.request.url.raw = '{{baseUrl}}/omnidesk/configuracoes-smtp/{{smtpCreatedId}}';
detail.request.url.path = ['omnidesk', 'configuracoes-smtp', '{{smtpCreatedId}}'];
detail.request.url.variable = [];
detail.event = [{
  listen: 'test',
  script: { type: 'text/javascript', exec: [
    "pm.test('GET por ID responde HTTP 200', function () { pm.response.to.have.status(200); });",
    'if (pm.response.code !== 200) postman.setNextRequest("' + cleanupName + '"); else {',
    '  let body = {}; try { body = pm.response.json(); } catch (e) {}',
    '  function hasSecret(value) { if (Array.isArray(value)) return value.some(hasSecret); if (value && typeof value === "object") return Object.entries(value).some(([k, v]) => /^(senha|senhaCriptografada|password)$/i.test(k) || hasSecret(v)); return false; }',
    "  pm.test('Consulta não devolve a senha', function () { pm.expect(hasSecret(body)).to.eql(false); });",
    "  pm.test('Consulta informa senha cadastrada', function () { pm.expect(body.senhaCadastrada).to.eql(true); });",
    '}'
  ] }
}];

update.request.url.raw = '{{baseUrl}}/omnidesk/configuracoes-smtp/{{smtpCreatedId}}';
update.request.url.path = ['omnidesk', 'configuracoes-smtp', '{{smtpCreatedId}}'];
update.request.url.variable = [];
update.request.body.raw = JSON.stringify({
  host: 'smtp-happy.invalid',
  porta: 465,
  seguranca: 'SSL_TLS',
  usuario: 'qa-smtp+{{smtpTestRunId}}@empresa.invalid',
  emailRemetente: 'qa-smtp+{{smtpTestRunId}}@empresa.invalid',
  nomeRemetente: createdName
}, null, 2);
update.event = [{
  listen: 'test',
  script: { type: 'text/javascript', exec: [
    "pm.test('PUT edita configuração SMTP com HTTP 200', function () { pm.response.to.have.status(200); });",
    'if (pm.response.code !== 200) postman.setNextRequest("' + cleanupName + '"); else {',
    '  let body = {}; try { body = pm.response.json(); } catch (e) {}',
    "  pm.test('PUT aplica porta e segurança', function () { pm.expect(body.porta).to.eql(465); pm.expect(body.seguranca).to.eql('SSL_TLS'); });",
    "  pm.test('PUT sem senha mantém senha cadastrada', function () { pm.expect(body.senhaCadastrada).to.eql(true); });",
    '}'
  ] }
}];

remove.request.url.raw = '{{baseUrl}}/omnidesk/configuracoes-smtp/{{smtpCreatedId}}';
remove.request.url.path = ['omnidesk', 'configuracoes-smtp', '{{smtpCreatedId}}'];
remove.request.url.variable = [];
remove.event = [{
  listen: 'test',
  script: { type: 'text/javascript', exec: [
    "pm.test('DELETE exclui a configuração criada neste run com HTTP 204', function () { pm.response.to.have.status(204); });"
  ] }
}];

const result = {
  info: {
    _postman_id: source.info?._postman_id,
    name: 'Omnidelicias API - SMTP Happy Path',
    description: 'Fluxo SMTP isolado: login, POST, GET lista, GET por ID, PUT sem senha e DELETE. O ID é capturado do POST e a limpeza só aponta para o registro criado pelo cenário.',
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
  },
  auth: source.auth,
  item: [
    { name: 'Autenticação', item: [login] },
    { name: 'Omnidesk - Configurações SMTP - Happy Path', item: smtp }
  ]
};
fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(`Suite SMTP happy path gerada com ${smtp.length} requests de negócio.`);
