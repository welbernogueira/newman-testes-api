const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'postman', 'Omnidelicias-API.postman_collection.json');
const happyPath = path.join(root, 'postman', 'Omnidelicias-Happy-Paths.postman_collection.json');
const catalogPath = path.join(root, 'docs', 'ENDPOINT-CATALOG.md');
const pkgPath = path.join(root, 'package.json');

function fail(message) {
  console.error(`CONFIG ERROR: ${message}`);
  process.exit(1);
}

for (const file of [sourcePath, happyPath, catalogPath, pkgPath]) {
  if (!fs.existsSync(file)) fail(`arquivo obrigatório não encontrado: ${path.relative(root, file)}`);
}

const source = parse(sourcePath);
const happy = parse(happyPath);
for (const collection of [source, happy]) {
  if (!collection.info?.schema?.includes('collection/v2.1.0')) fail('collection não declara schema Postman v2.1.0.');
  if (!Array.isArray(collection.item)) fail('collection deve conter o array item.');
}
const sourceCount = countRequests(source.item);
const happyCount = countRequests(happy.item);
if (!sourceCount) fail('collection original está sem requests.');
if (!happyCount) fail('suite happy paths está sem requests; rode scripts/generate-happy-path-suite.js.');
const missingAssertions = findMissingAssertions(happy.item);
if (missingAssertions.length) fail(`${missingAssertions.length} happy paths sem assertion HTTP 2xx; exemplo: ${missingAssertions[0]}`);

console.log(`Configuração validada: ${sourceCount} requests na origem; ${happyCount} happy paths com assertion.`);

function parse(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { fail(`JSON inválido em ${path.relative(root, file)}: ${error.message}`); }
}
function countRequests(items) {
  return items.reduce((n, item) => n + (item.request ? 1 : 0) + (Array.isArray(item.item) ? countRequests(item.item) : 0), 0);
}
function findMissingAssertions(items) {
  const missing = [];
  for (const item of items || []) {
    if (item.request) {
      const scripts = (item.event || []).filter((event) => event.listen === 'test').flatMap((event) => event.script?.exec || []);
      if (!scripts.some((line) => line.includes("pm.test('HTTP status 2xx'"))) missing.push(item.name);
    } else missing.push(...findMissingAssertions(item.item));
  }
  return missing;
}
