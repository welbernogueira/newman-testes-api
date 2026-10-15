# Omnidelicias API — Newman

Suite de API baseada na collection original do Postman. A primeira etapa organiza happy paths por método e rota, valida status HTTP 2xx e gera relatórios Newman para acompanhar a cobertura.

## Execução read-only

Exporte o environment `OMNIDESK` para `postman/environments/OMNIDESK.json` e rode no PowerShell:

```powershell
$env:POSTMAN_ENV = "postman/environments/OMNIDESK.json"
npm run test:happy:read
```

O grupo executa login e os GETs candidatos. Os relatórios HTML e JSON são gerados em `reports/`, com corpos, headers e valores de ambiente removidos.

## Cenários e cobertura

O gerador cria uma suite inicial por método/rota e o inventário dos endpoints:

```powershell
node scripts/generate-happy-path-suite.js
npm run validate
```

Consulte [docs/ENDPOINT-CATALOG.md](docs/ENDPOINT-CATALOG.md), [docs/TEST-STRATEGY.md](docs/TEST-STRATEGY.md) e [docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md).

## SMTP: happy path CRUD

Para executar somente o fluxo SMTP completo no environment OMNIDESK:

```powershell
$env:POSTMAN_ENV = "postman/environments/OMNIDESK.json"
$env:SMTP_TEST_ID_EMPRESA = "1" # ajuste para a empresa de homologação
$env:ALLOW_DESTRUCTIVE = "true"
npm run test:smtp:happy
```

O fluxo autentica e executa POST, GET de lista, GET por ID, PUT sem trocar a senha e DELETE. Cada execução usa remetente e marcador únicos, obtém o ID da listagem filtrada e exclui apenas o registro localizado por esse marcador. Se a listagem não confirmar o registro, o fluxo para sem tentar excluir um ID incerto. Os relatórios JSON e HTML são gerados em `reports/` com dados sensíveis removidos. Consulte [docs/SMTP-HAPPY-PATH-REPORT.md](docs/SMTP-HAPPY-PATH-REPORT.md).

Os 227 happy paths candidatos incluem 96 operações mutáveis ainda não executadas. `npm run test:happy` e `npm run test:smtp` exigem `ALLOW_DESTRUCTIVE=true` e `HAPPY_PATH_FIXTURES_READY=true`; não habilite essas variáveis antes de revisar as operações. O fluxo `test:smtp:happy` é independente e usa registro dinâmico com exclusão ao final.

## Ambiente e segurança

- Não versione `postman/environments/OMNIDESK.json` nem credenciais.
- A collection original permanece em `postman/Omnidelicias-API.postman_collection.json`.
- Newman é apropriado para testes funcionais sequenciais, não para carga.
