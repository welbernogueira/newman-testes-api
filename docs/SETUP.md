# Configuração e execução

Requisitos: Node.js 20+ e as dependências do projeto (`npm install`). Exporte o environment `OMNIDESK` para `postman/environments/OMNIDESK.json`; mantenha o arquivo local, pois contém credenciais e é ignorado pelo Git.

PowerShell:

```powershell
$env:POSTMAN_ENV = "postman/environments/OMNIDESK.json"
npm run test:happy:read
```

Esse comando autentica e executa os GETs selecionados. Gera os relatórios em `reports/` e retorna código diferente de zero quando alguma assertion falha.

Para regenerar apenas a suite e o catálogo sem chamar a API:

```powershell
node scripts/generate-happy-path-suite.js
npm run validate
```

`npm run test:happy` inclui operações de escrita e exige `ALLOW_DESTRUCTIVE=true`. A suite ainda usa exemplos e IDs fixos nos requests mutáveis; não a execute até preparar fixtures únicas, IDs dinâmicos e limpeza.
