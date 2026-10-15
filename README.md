# Omnidelicias API — Newman

Suite de API baseada na collection original do Postman. A primeira etapa organiza happy paths por método e rota, valida status HTTP 2xx e gera relatórios Newman para acompanhar a cobertura.

## Execução read-only

Exporte o environment `OMNIDESK` para `postman/environments/OMNIDESK.json` e rode no PowerShell:

```powershell
$env:POSTMAN_ENV = "postman/environments/OMNIDESK.json"
npm run test:happy:read
```

O grupo executa login e os GETs candidatos. Os relatórios HTML e JSON são gerados em `reports/`, com corpos, headers e valores de ambiente removidos.

## Evidências de execução

Cada execução cria `evidence/<grupo>-<data>/`, com uma subpasta por cenário registrado pelo Newman. O `RESUMO.md` lista os cenários na ordem executada e conta os status `APROVADO`, `REPROVADO`, `BLOQUEADO` e `PENDENTE`. Cada subpasta reserva locais para vídeo, capturas por etapa, resultado final e arquivos complementares. Um cenário só fica `APROVADO` quando há resposta e ao menos uma validação Newman aprovada; sem resposta ou validação, fica `BLOQUEADO`.

O dossiê inclui todos os itens do escopo selecionado na coleção, mesmo quando o fluxo para antes de executá-los. Itens posteriores a uma etapa bloqueada ficam `BLOQUEADO`, com o motivo registrado; outros itens não iniciados ficam `PENDENTE`.

## Matriz QA — execução final de 2026-10-15

A planilha oficial preenchida preserva a ordem e o formato de origem: [Matriz QA final](docs/Matriz_QA_Omnidesk_StatusTicket_Tags_Datas_Asteriscos_FINAL_2026-10-15.xlsx). O resultado auditável e as evidências por linha estão em [RESUMO.md](evidence/qa-execution-2026-10-15-status-ticket-final/RESUMO.md).

Foram registrados 5 cenários BLOQUEADOS, 0 aprovados e 0 reprovados. A API local e os pré-requisitos de dados responderam; a interface de Status de Ticket não estava acessível nas origens locais testadas. Como os cenários são visuais, nenhum recebeu aprovação com base apenas na API. A evidência inclui a captura real da tentativa de abertura e o motivo para a ausência de vídeos de cenário.

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
