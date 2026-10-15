# Relatório da etapa happy path read-only

- Data: 15/10/2026
- Execução: `happy-read` com environment OMNIDESK
- Requests: 131 (login + 130 GETs)
- HTTP 2xx: 109
- HTTP 400: 5
- HTTP 404: 15
- HTTP 409: 1
- Timeout de transporte: 1
- Assertions HTTP falhas: 22
- Operações de escrita executadas: 0

Arquivos Newman: `reports/happy-read-2026-10-15T18-23-59-737Z.html` e `reports/happy-read-2026-10-15T18-23-59-737Z.json`.

## Requests que precisam de massa ou revisão

| ID | Cenário | Resultado |
|---|---|---:|
| HP-039 | Tickets abertos por equipe | 400 |
| HP-042 | Relatório de tickets abertos por período | Timeout |
| HP-046 | Relatório de tickets concluídos por período | 404 |
| HP-047 | Contagem de tickets abertos por equipe | 400 |
| HP-065 | Tickets por status | 404 |
| HP-090 | Conteúdo de anexo | 400 |
| HP-092 | Projetos de integração Jira | 409 |
| HP-093 | Tipos de item do projeto Jira | 404 |
| HP-096 | Consulta de usuário por ID | 404 |
| HP-097 | Perfil de acesso a tickets do usuário | 404 |
| HP-098 | Perfis do usuário | 404 |
| HP-106 | Download de arquivo | 400 |
| HP-123 | Associação serviço/categoria por ID | 404 |
| HP-135 | Associação serviço/equipe por ID | 404 |
| HP-142 | Associação usuário/perfil por ID | 404 |
| HP-146 | Condições de análise da integração Jira | 404 |
| HP-151 | Correlação de campos da integração por ID | 404 |
| HP-175 | Quadro Jira da conexão | 400 |
| HP-180 | Usuários associados à equipe | 404 |
| HP-181 | Relatório de usuários associados à equipe | 404 |
| HP-204 | Template por ID | 404 |
| HP-225 | Configuração SMTP por ID | 404 |

Esses resultados não foram classificados como defeitos: vários cenários usam IDs fixos que não existem no environment, e alguns requests precisam de parâmetros obrigatórios. Revisar o contrato e preparar fixtures antes de reexecutar.

Os relatórios excluem corpos, headers e valores do environment. O ambiente OMNIDESK contém credenciais e permanece fora do Git.
