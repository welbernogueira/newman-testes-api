# Arquitetura

- `postman/Omnidelicias-API.postman_collection.json`: collection de origem, preservada.
- `scripts/generate-happy-path-suite.js`: seleciona um cenário positivo por método/rota e gera a suite e o catálogo.
- `postman/Omnidelicias-Happy-Paths.postman_collection.json`: suite inicial com uma assertion HTTP 2xx por cenário.
- `scripts/run-tests.js`: executa Newman, filtra os GETs para a etapa read-only, aplica proteção às execuções mutáveis e cria relatórios JSON/HTML.
- `scripts/redact-report.js`: remove credenciais, valores de ambiente, headers e corpos dos relatórios.
- `reports/`: saídas locais, ignoradas pelo Git.

O environment é fornecido por `POSTMAN_ENV`; não fica embutido na collection nem no relatório. O export de `postman/environments/` é ignorado pelo Git.
