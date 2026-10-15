const fs = require('node:fs');
const path = require('node:path');
const dir = path.resolve(__dirname, '..', 'reports');
const files = fs.readdirSync(dir).filter(f => /\.(json|html)$/.test(f));
if (!files.length) console.log('Nenhum relatório disponível ainda.');
else files.forEach(f => console.log(path.join('reports', f)));
