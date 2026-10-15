# Evidências da rodada smtp-happy
- **Início/identificador da rodada:** 2026-10-15T19-58-09-162Z
- **Relatório Newman:** [JSON](../../reports/smtp-happy-2026-10-15T19-58-09-162Z.json)
- **Cenários registrados:** 6
- **Relatório disponível:** sim
## Origem do roteiro
Excel localizado em docs\Matriz-Testes-QA-Template.xlsx. Nao ha associacao automatica com as linhas da planilha; os cenarios abaixo sao o escopo selecionado na colecao Newman, com status de execucao por item. Confira a correspondencia com o roteiro oficial.
## Contagem por status
- **APROVADO:** 6
- **REPROVADO:** 0
- **BLOQUEADO:** 0
- **PENDENTE:** 0
## Cenários na ordem executada
| Ordem | Cenário | Status |
|---:|---|---|
| 1 | [POST /oauth/login  <-- comece por aqui](<001 - POST _oauth_login  _-- comece por aqui/resultado/resultado.md>) | APROVADO |
| 2 | [POST /omnidesk/configuracoes-smtp (cadastrar)](<002 - POST _omnidesk_configuracoes-smtp (cadastrar)/resultado/resultado.md>) | APROVADO |
| 3 | [GET /omnidesk/configuracoes-smtp (lista paginada + RSQL)](<003 - GET _omnidesk_configuracoes-smtp (lista paginada + RSQL)/resultado/resultado.md>) | APROVADO |
| 4 | [GET /omnidesk/configuracoes-smtp/{id}](<004 - GET _omnidesk_configuracoes-smtp_{id}/resultado/resultado.md>) | APROVADO |
| 5 | [PUT /omnidesk/configuracoes-smtp/{id}](<005 - PUT _omnidesk_configuracoes-smtp_{id}/resultado/resultado.md>) | APROVADO |
| 6 | [DELETE /omnidesk/configuracoes-smtp/{id} (excluir)](<006 - DELETE _omnidesk_configuracoes-smtp_{id} (excluir)/resultado/resultado.md>) | APROVADO |
