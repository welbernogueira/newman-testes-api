# Catálogo inicial de endpoints e happy paths

Inventário gerado da collection original em 2026-10-15. Rotas agrupadas por método e template de caminho; query strings não criam endpoints separados. Foram selecionados 227 happy paths candidatos entre 229 combinações método/rota. A seleção usa o nome do request para excluir cenários explicitamente negativos; confirme cada massa e cada resposta com o contrato da API.

A suite valida inicialmente apenas o status HTTP 2xx. Os testes de contrato, pré-condições e limpeza serão detalhados por endpoint na próxima rodada. Requests de escrita estão identificados e não devem ser executados até terem massa isolada e limpeza definida.

| ID | Método | Rota | Pasta | Cenário fonte | Execução |
|---|---|---|---|---|---|
| HP-001 | GET | `/actuator/health` | 00 - Diagnostico (rode nesta ordem) | 1. A API esta no ar? | Leitura |
| HP-002 | GET | `/oauth/authorize` | Auth (API) | GET /oauth/authorize (fluxo com navegador) | Leitura |
| HP-003 | POST | `/oauth/login` | Auth (API) | POST /oauth/login  <-- comece por aqui | Mutação: validar massa/limpeza antes de executar |
| HP-004 | POST | `/oauth/logout` | Auth (API) | POST /oauth/logout | Mutação: validar massa/limpeza antes de executar |
| HP-005 | POST | `/oauth/refresh` | Auth (API) | POST /oauth/refresh | Mutação: validar massa/limpeza antes de executar |
| HP-006 | POST | `/oauth/token` | Auth (API) | POST /oauth/token (troca o code do fluxo acima) | Mutação: validar massa/limpeza antes de executar |
| HP-007 | DELETE | `/omnidesk/urgencias/{id}` | Omnidesk - Urgencias | DELETE /omnidesk/urgencias/{id} | Mutação: validar massa/limpeza antes de executar |
| HP-008 | GET | `/omnidesk/urgencias` | Omnidesk - Urgencias | GET /omnidesk/urgencias (ListarUrgenciaPaginado - ON-279) | Leitura |
| HP-009 | GET | `/omnidesk/urgencias/{id}` | Omnidesk - Urgencias | GET /omnidesk/urgencias/{id} (ConsultarUrgenciaPorId - ON-280) | Leitura |
| HP-010 | GET | `/omnidesk/urgencias/lista` | Omnidesk - Urgencias | GET /omnidesk/urgencias/lista (ListarUrgencia - ON-176) | Leitura |
| HP-011 | GET | `/omnidesk/urgencias/relatorio` | Omnidesk - Urgencias | GET /omnidesk/urgencias/relatorio (GerarRelatorioUrgencia) | Leitura |
| HP-012 | PATCH | `/omnidesk/urgencias/{id}/status` | Omnidesk - Urgencias | PATCH /omnidesk/urgencias/{id}/status (AlterarStatusUrgencia - ON-171) | Mutação: validar massa/limpeza antes de executar |
| HP-013 | POST | `/omnidesk/urgencias` | Omnidesk - Urgencias | POST /omnidesk/urgencias (CriarUrgencia - ON-281) | Mutação: validar massa/limpeza antes de executar |
| HP-014 | PUT | `/omnidesk/urgencias/{id}` | Omnidesk - Urgencias | PUT /omnidesk/urgencias/{id} | Mutação: validar massa/limpeza antes de executar |
| HP-015 | DELETE | `/omnidesk/tags/{id}` | Omnidesk - Etiquetas | DELETE /omnidesk/tags/{id} | Mutação: validar massa/limpeza antes de executar |
| HP-016 | GET | `/omnidesk/tags` | Omnidesk - Etiquetas | GET /omnidesk/tags (paginado + RSQL) | Leitura |
| HP-017 | GET | `/omnidesk/tags/{id}` | Omnidesk - Etiquetas | GET /omnidesk/tags/{id} | Leitura |
| HP-018 | GET | `/omnidesk/tags/ativos` | Omnidesk - Etiquetas | GET /omnidesk/tags/ativos (ListarTagAtivosPorParametros) | Leitura |
| HP-019 | GET | `/omnidesk/tags/busca` | Omnidesk - Etiquetas | GET /omnidesk/tags/busca (ConsultarTagPorNomeStatus) | Leitura |
| HP-020 | GET | `/omnidesk/tags/relatorio` | Omnidesk - Etiquetas | GET /omnidesk/tags/relatorio (RelatorioTagPorNomeStatus) | Leitura |
| HP-021 | PATCH | `/omnidesk/tags/{id}/status` | Omnidesk - Etiquetas | PATCH /omnidesk/tags/{id}/status | Mutação: validar massa/limpeza antes de executar |
| HP-022 | POST | `/omnidesk/tags` | Omnidesk - Etiquetas | POST /omnidesk/tags (CriarTag - ON-285) | Mutação: validar massa/limpeza antes de executar |
| HP-023 | PUT | `/omnidesk/tags/{id}` | Omnidesk - Etiquetas | PUT /omnidesk/tags/{id} (AtualizarTag - ON-286) | Mutação: validar massa/limpeza antes de executar |
| HP-024 | DELETE | `/omnidesk/equipes/{id}` | Omnidesk - Equipes | DELETE /omnidesk/equipes/{id} | Mutação: validar massa/limpeza antes de executar |
| HP-025 | GET | `/omnidesk/equipes` | Omnidesk - Equipes | GET /omnidesk/equipes (ListarEquipesPaginado - ON-275) | Leitura |
| HP-026 | GET | `/omnidesk/equipes/{id}` | Omnidesk - Equipes | GET /omnidesk/equipes/{id} | Leitura |
| HP-027 | GET | `/omnidesk/equipes/contagem-tickets` | Omnidesk - Equipes | GET /omnidesk/equipes/contagem-tickets (ListarContagemTicketsDeTodasEquipes) | Leitura |
| HP-028 | GET | `/omnidesk/equipes/relatorio` | Omnidesk - Equipes | GET /omnidesk/equipes/relatorio (RelatorioEquipesParametros) | Leitura |
| HP-029 | GET | `/omnidesk/equipes/tickets` | Omnidesk - Equipes | GET /omnidesk/equipes/tickets (paginado) | Leitura |
| HP-030 | GET | `/omnidesk/equipes/tickets/relatorio` | Omnidesk - Equipes | GET /omnidesk/equipes/tickets/relatorio (GerarRelatorioRelTicketsEquipes) | Leitura |
| HP-031 | PATCH | `/omnidesk/equipes/{id}/status` | Omnidesk - Equipes | PATCH /omnidesk/equipes/{id}/status (AlterarStatusEquipe - ON-65) | Mutação: validar massa/limpeza antes de executar |
| HP-032 | POST | `/omnidesk/equipes` | Omnidesk - Equipes | POST /omnidesk/equipes (CriarEquipes - ON-66) | Mutação: validar massa/limpeza antes de executar |
| HP-033 | PUT | `/omnidesk/equipes/{id}` | Omnidesk - Equipes | PUT /omnidesk/equipes/{id} (AtualizarEquipes - ON-64) | Mutação: validar massa/limpeza antes de executar |
| HP-034 | PUT | `/omnidesk/equipes/{id}/servicos` | Omnidesk - Equipes | PUT /omnidesk/equipes/{id}/servicos | Mutação: validar massa/limpeza antes de executar |
| HP-035 | PUT | `/omnidesk/equipes/{id}/usuarios` | Omnidesk - Equipes | PUT /omnidesk/equipes/{id}/usuarios | Mutação: validar massa/limpeza antes de executar |
| HP-036 | GET | `/omnidesk/tickets` | Omnidesk - Tickets | GET /omnidesk/tickets (paginado + RSQL) | Leitura |
| HP-037 | GET | `/omnidesk/tickets/{id}` | Omnidesk - Tickets | GET /omnidesk/tickets/{id} | Leitura |
| HP-038 | GET | `/omnidesk/tickets/{id}/historico` | Omnidesk - Tickets | GET /omnidesk/tickets/{id}/historico (ConsultarTicketUserHistoricoPorId) | Leitura |
| HP-039 | GET | `/omnidesk/tickets/abertos-por-equipe` | Omnidesk - Tickets | GET /omnidesk/tickets/abertos-por-equipe (ListarTicketsAbertosEquipe) | Leitura |
| HP-040 | GET | `/omnidesk/tickets/abertos-por-equipe/relatorio` | Omnidesk - Tickets | GET /omnidesk/tickets/abertos-por-equipe/relatorio (GerarRelatorioTicketsAbertosEquipe) | Leitura |
| HP-041 | GET | `/omnidesk/tickets/abertos-por-periodo` | Omnidesk - Tickets | GET /omnidesk/tickets/abertos-por-periodo (ListagemTicketAbertosPorPeriodo) | Leitura |
| HP-042 | GET | `/omnidesk/tickets/abertos-por-periodo/relatorio` | Omnidesk - Tickets | GET /omnidesk/tickets/abertos-por-periodo/relatorio (GerarRelatorioTicketsAbertosPeriodo) | Leitura |
| HP-043 | GET | `/omnidesk/tickets/cancelados-por-periodo` | Omnidesk - Tickets | GET /omnidesk/tickets/cancelados-por-periodo (ListagemTicketCanceladosPorPeriodo) | Leitura |
| HP-044 | GET | `/omnidesk/tickets/cancelados-por-periodo/relatorio` | Omnidesk - Tickets | GET /omnidesk/tickets/cancelados-por-periodo/relatorio (GerarRelatorioTicketsCanceladosPeriodo) | Leitura |
| HP-045 | GET | `/omnidesk/tickets/concluidos-por-periodo` | Omnidesk - Tickets | GET /omnidesk/tickets/concluidos-por-periodo (ListagemTicketConcluidosPorPeriodo) | Leitura |
| HP-046 | GET | `/omnidesk/tickets/concluidos-por-periodo/relatorio` | Omnidesk - Tickets | GET /omnidesk/tickets/concluidos-por-periodo/relatorio (GerarRelatorioTicketConcluidosPorPeriodo) | Leitura |
| HP-047 | GET | `/omnidesk/tickets/contagem-abertos-por-equipe` | Omnidesk - Tickets | GET /omnidesk/tickets/contagem-abertos-por-equipe (ListarTicketsAbertosEquipeContador) | Leitura |
| HP-048 | GET | `/omnidesk/tickets/contagem-equipes-por-usuario` | Omnidesk - Tickets | GET /omnidesk/tickets/contagem-equipes-por-usuario (ContarTicketsEquipesPorUsuario) | Leitura |
| HP-049 | GET | `/omnidesk/tickets/contagem-meus-tickets` | Omnidesk - Tickets | GET /omnidesk/tickets/contagem-meus-tickets (ConsultarContadorMeusTickets) | Leitura |
| HP-050 | GET | `/omnidesk/tickets/contagem-vencidos-por-equipe` | Omnidesk - Tickets | GET /omnidesk/tickets/contagem-vencidos-por-equipe (ContarTicketsVencidosEquipe) | Leitura |
| HP-051 | GET | `/omnidesk/tickets/contagem-vencidos-por-usuario` | Omnidesk - Tickets | GET /omnidesk/tickets/contagem-vencidos-por-usuario (ContarTicketsVencidosPoruser) | Leitura |
| HP-052 | GET | `/omnidesk/tickets/contagem/abertos` | Omnidesk - Tickets | GET /omnidesk/tickets/contagem/abertos (ContarTicketAbertosPorPeriodo) | Leitura |
| HP-053 | GET | `/omnidesk/tickets/contagens/concluidos-no-periodo` | Omnidesk - Tickets | GET /omnidesk/tickets/contagens/concluidos-no-periodo (ContarTicketsConcluidosNoPeriodo) | Leitura |
| HP-054 | GET | `/omnidesk/tickets/contagens/fechados-no-periodo` | Omnidesk - Tickets | GET /omnidesk/tickets/contagens/fechados-no-periodo (ContarTicketsFechadosNoPeriodo) | Leitura |
| HP-055 | GET | `/omnidesk/tickets/equipe-por-adm` | Omnidesk - Tickets | GET /omnidesk/tickets/equipe-por-adm (ConsultarTicketEquipePorAdm) | Leitura |
| HP-056 | GET | `/omnidesk/tickets/equipe-por-adm/relatorio` | Omnidesk - Tickets | GET /omnidesk/tickets/equipe-por-adm/relatorio (GerarRelatorioTicketEquipePorAdm, pdf) | Leitura |
| HP-057 | GET | `/omnidesk/tickets/equipes-por-usuario` | Omnidesk - Tickets | GET /omnidesk/tickets/equipes-por-usuario (ListarTicketsEquipesPorUsuario) | Leitura |
| HP-058 | GET | `/omnidesk/tickets/equipes-por-usuario/relatorio` | Omnidesk - Tickets | GET /omnidesk/tickets/equipes-por-usuario/relatorio (GerarRelatorioListarTicketsEquipesPorUsuario) | Leitura |
| HP-059 | GET | `/omnidesk/tickets/equipes-por-usuario/vencidos/relatorio` | Omnidesk - Tickets | GET /omnidesk/tickets/equipes-por-usuario/vencidos/relatorio (GerarRelatorioListarTicketsVencidosEquipesPorUsuario) | Leitura |
| HP-060 | GET | `/omnidesk/tickets/pendentes-por-fields` | Omnidesk - Tickets | GET /omnidesk/tickets/pendentes-por-fields (ListarTicketPendentePorFields) | Leitura |
| HP-061 | GET | `/omnidesk/tickets/pendentes-por-fields/relatorio` | Omnidesk - Tickets | GET /omnidesk/tickets/pendentes-por-fields/relatorio (GerarRelatorioTicketPendente) | Leitura |
| HP-062 | GET | `/omnidesk/tickets/por-adm` | Omnidesk - Tickets | GET /omnidesk/tickets/por-adm (ConsultarTicketPorAdmPaginado) | Leitura |
| HP-063 | GET | `/omnidesk/tickets/por-numero/{idTicket}` | Omnidesk - Tickets | GET /omnidesk/tickets/por-numero/{idTicket} (ConsultarTicketPorIdTicket) | Leitura |
| HP-064 | GET | `/omnidesk/tickets/por-numero/{idTicket}/historico` | Omnidesk - Tickets | GET /omnidesk/tickets/por-numero/{idTicket}/historico (ConsultarTicketUserHistoricoPorNumero) | Leitura |
| HP-065 | GET | `/omnidesk/tickets/por-status` | Omnidesk - Tickets | GET /omnidesk/tickets/por-status (ListarTicketPorStatusPaginado) | Leitura |
| HP-066 | GET | `/omnidesk/tickets/por-status/relatorio` | Omnidesk - Tickets | GET /omnidesk/tickets/por-status/relatorio (GerarRelatorioTicket) | Leitura |
| HP-067 | GET | `/omnidesk/tickets/protocolos` | Omnidesk - Tickets | GET /omnidesk/tickets/protocolos (ListarTicketsProtocolo) | Leitura |
| HP-068 | GET | `/omnidesk/tickets/protocolos/contagem` | Omnidesk - Tickets | GET /omnidesk/tickets/protocolos/contagem (ContarTicketsProtocolo) | Leitura |
| HP-069 | GET | `/omnidesk/tickets/protocolos/relatorio` | Omnidesk - Tickets | GET /omnidesk/tickets/protocolos/relatorio (GerarRelatorioTicketsProtocolo) | Leitura |
| HP-070 | GET | `/omnidesk/tickets/total-por-responsavel` | Omnidesk - Tickets | GET /omnidesk/tickets/total-por-responsavel (ListagemTotalTicketResponsavel) | Leitura |
| HP-071 | GET | `/omnidesk/tickets/vencidos-por-equipe` | Omnidesk - Tickets | GET /omnidesk/tickets/vencidos-por-equipe (ListarVencimentosEquipes) | Leitura |
| HP-072 | GET | `/omnidesk/tickets/vencidos-por-usuario` | Omnidesk - Tickets | GET /omnidesk/tickets/vencidos-por-usuario (ListarTicketsVencidosPorUsuario) | Leitura |
| HP-073 | GET | `/omnidesk/tickets/vencidos-por-usuario/relatorio` | Omnidesk - Tickets | GET /omnidesk/tickets/vencidos-por-usuario/relatorio (GerarRelatorioTicketsVencidosPorUsuario) | Leitura |
| HP-074 | PATCH | `/omnidesk/tickets/{id}/cancelamento-automatico` | Omnidesk - Tickets | PATCH /omnidesk/tickets/{id}/cancelamento-automatico (AtualizarCancelamentoAutomatico) | Mutação: validar massa/limpeza antes de executar |
| HP-075 | PATCH | `/omnidesk/tickets/{id}/status` | Omnidesk - Tickets | PATCH /omnidesk/tickets/{id}/status (AtivarOuInativarTicket) | Mutação: validar massa/limpeza antes de executar |
| HP-076 | POST | `/omnidesk/tickets` | Omnidesk - Tickets | POST /omnidesk/tickets (CriarTicketComInteracaoInicial - ON-126) | Mutação: validar massa/limpeza antes de executar |
| HP-077 | POST | `/omnidesk/tickets/{id}/enviar-email` | Omnidesk - Tickets | POST /omnidesk/tickets/{id}/enviar-email (EnviarTicketPorEmail) | Mutação: validar massa/limpeza antes de executar |
| HP-078 | POST | `/omnidesk/tickets/cabecalho` | Omnidesk - Tickets | POST /omnidesk/tickets/cabecalho (CriarTicket, so cabecalho) | Mutação: validar massa/limpeza antes de executar |
| HP-079 | PUT | `/omnidesk/tickets/{id}` | Omnidesk - Tickets | PUT /omnidesk/tickets/{id} (AtualizarTicket FecharConcluirOuTransferir) | Mutação: validar massa/limpeza antes de executar |
| HP-080 | PUT | `/omnidesk/tickets/notificacoes/status` | Omnidesk - Tickets | PUT /omnidesk/tickets/notificacoes/status (AlterarStatusNotificacao) | Mutação: validar massa/limpeza antes de executar |
| HP-081 | GET | `/omnidesk/ticket-logs` | Omnidesk - Ticket Log | GET /omnidesk/ticket-logs (ConsultarTicketLogPorIdHeader) | Leitura |
| HP-082 | GET | `/omnidesk/ticket-logs/paginado` | Omnidesk - Ticket Log | GET /omnidesk/ticket-logs/paginado (ConsultarTicketLogPaginado) | Leitura |
| HP-083 | GET | `/omnidesk/ticket-logs/relatorio` | Omnidesk - Ticket Log | GET /omnidesk/ticket-logs/relatorio (GerarRelatorioDoHistoricoDoTicket) | Leitura |
| HP-084 | POST | `/omnidesk/ticket-logs` | Omnidesk - Ticket Log | POST /omnidesk/ticket-logs (CriarTicketLog) | Mutação: validar massa/limpeza antes de executar |
| HP-085 | POST | `/omnidesk/ticket-logs/lote` | Omnidesk - Ticket Log | POST /omnidesk/ticket-logs/lote (CriarTicketLogLote) | Mutação: validar massa/limpeza antes de executar |
| HP-086 | POST | `/omnidesk/tickets-tags` | Omnidesk - Catalogo de etiquetas de ticket | POST /omnidesk/tickets-tags (CriarTagsLote) | Mutação: validar massa/limpeza antes de executar |
| HP-087 | DELETE | `/omnidesk/anexos/{id}` | Omnidesk - Anexos de ticket | DELETE /omnidesk/anexos/{id} | Mutação: validar massa/limpeza antes de executar |
| HP-088 | GET | `/omnidesk/anexos` | Omnidesk - Anexos de ticket | GET /omnidesk/anexos?idTicketItem | Leitura |
| HP-089 | GET | `/omnidesk/anexos/{id}` | Omnidesk - Anexos de ticket | GET /omnidesk/anexos/{id} | Leitura |
| HP-090 | GET | `/omnidesk/anexos/{id}/conteudo` | Omnidesk - Anexos de ticket | GET /omnidesk/anexos/{id}/conteudo (download) | Leitura |
| HP-091 | POST | `/omnidesk/anexos` | Omnidesk - Anexos de ticket | POST /omnidesk/anexos (upload) | Mutação: validar massa/limpeza antes de executar |
| HP-092 | GET | `/omnidesk/integracoes-jira/projetos` | Omnidesk - Integracao Jira | GET /omnidesk/integracoes-jira/projetos | Leitura |
| HP-093 | GET | `/omnidesk/integracoes-jira/projetos/{id}/tipos-item` | Omnidesk - Integracao Jira | GET /omnidesk/integracoes-jira/projetos/{idProjeto}/tipos-item | Leitura |
| HP-094 | DELETE | `/cadastro/usuarios/{id}` | Cadastro - Usuarios | DELETE /cadastro/usuarios/{id} | Mutação: validar massa/limpeza antes de executar |
| HP-095 | GET | `/cadastro/usuarios` | Cadastro - Usuarios | GET /cadastro/usuarios | Leitura |
| HP-096 | GET | `/cadastro/usuarios/{id}` | Cadastro - Usuarios | GET /cadastro/usuarios/{id} | Leitura |
| HP-097 | GET | `/cadastro/usuarios/{id}/perfil-acesso-tickets` | Cadastro - Usuarios | GET /cadastro/usuarios/{idUsuario}/perfil-acesso-tickets | Leitura |
| HP-098 | GET | `/cadastro/usuarios/{id}/perfis` | Cadastro - Usuarios | GET /cadastro/usuarios/{idUsuario}/perfis | Leitura |
| HP-099 | POST | `/cadastro/usuarios` | Cadastro - Usuarios | POST /cadastro/usuarios | Mutação: validar massa/limpeza antes de executar |
| HP-100 | POST | `/cadastro/usuarios/{id}/senha` | Cadastro - Usuarios | POST /cadastro/usuarios/{id}/senha | Mutação: validar massa/limpeza antes de executar |
| HP-101 | PUT | `/cadastro/usuarios/{id}` | Cadastro - Usuarios | PUT /cadastro/usuarios/{id} | Mutação: validar massa/limpeza antes de executar |
| HP-102 | GET | `/omnidesk/usuarios-perfis` | Omnidesk - Usuarios e Perfis | GET /omnidesk/usuarios-perfis (paginado) | Leitura |
| HP-103 | GET | `/omnidesk/usuarios-perfis/relatorio` | Omnidesk - Usuarios e Perfis | GET /omnidesk/usuarios-perfis/relatorio | Leitura |
| HP-104 | GET | `/public` | Publico | GET /public | Leitura |
| HP-105 | GET | `/public/versao` | Publico | GET /public/versao | Leitura |
| HP-106 | GET | `/arquivos/00000000-0000-0000-0000-000000000000` | Arquivos | GET /arquivos/{id} (download) | Leitura |
| HP-107 | POST | `/arquivos` | Arquivos | POST /arquivos (upload unico) | Mutação: validar massa/limpeza antes de executar |
| HP-108 | POST | `/arquivos/multiplos` | Arquivos | POST /arquivos/multiplos | Mutação: validar massa/limpeza antes de executar |
| HP-109 | GET | `/events/stream/meu-topico` | Eventos (SSE) | GET /events/stream/{topic} | Leitura |
| HP-110 | GET | `/actuator/info` | Actuator | GET /actuator/info | Leitura |
| HP-111 | GET | `/swagger-ui.html` | OpenAPI / Swagger | GET /swagger-ui.html | Leitura |
| HP-112 | GET | `/v3/api-docs` | OpenAPI / Swagger | GET /v3/api-docs | Leitura |
| HP-113 | GET | `/omnidesk/justificativas/:idJustificativa/status-justificativas` | Omnidesk - Status x Justificativas | GET /omnidesk/justificativas/{idJustificativa}/status-justificativas (ConsultarAssociacaoStatusJustPorId) | Leitura |
| HP-114 | GET | `/omnidesk/status-justificativas` | Omnidesk - Status x Justificativas | GET /omnidesk/status-justificativas (ConsultarAssociacaoStatusJustPaginado) | Leitura |
| HP-115 | GET | `/omnidesk/status-justificativas/:idAssociacao` | Omnidesk - Status x Justificativas | GET /omnidesk/status-justificativas/{idAssociacao} (ConsultarAssociacaoStatusPorId) | Leitura |
| HP-116 | GET | `/omnidesk/status-justificativas/relatorio` | Omnidesk - Status x Justificativas | GET /omnidesk/status-justificativas/relatorio (GerarRelatorioAssociacaoStatusJust) | Leitura |
| HP-117 | PATCH | `/omnidesk/status-justificativas/:id` | Omnidesk - Status x Justificativas | PATCH /omnidesk/status-justificativas/{id} (AtualizarAssociacaoStatusJustificativa) | Mutação: validar massa/limpeza antes de executar |
| HP-118 | PATCH | `/omnidesk/status-justificativas/:id/status` | Omnidesk - Status x Justificativas | PATCH /omnidesk/status-justificativas/{id}/status (AlterarStatusAssociacaoJust) | Mutação: validar massa/limpeza antes de executar |
| HP-119 | POST | `/omnidesk/status-justificativas` | Omnidesk - Status x Justificativas | POST /omnidesk/status-justificativas (CriarAssociacaoStatusJustificativa) | Mutação: validar massa/limpeza antes de executar |
| HP-120 | GET | `/omnidesk/associacoes-servico-categoria` | Omnidesk - Categorias do Servico | GET /omnidesk/associacoes-servico-categoria (ConsultarAssociacaoServicoCategoriaPaginado) | Leitura |
| HP-121 | GET | `/omnidesk/associacoes-servico-categoria/relatorio` | Omnidesk - Categorias do Servico | GET /omnidesk/associacoes-servico-categoria/relatorio (GerarRelatorioAssociacaoServicoCategoria) | Leitura |
| HP-122 | GET | `/omnidesk/servicos/:idServico/categorias` | Omnidesk - Categorias do Servico | GET /omnidesk/servicos/{idServico}/categorias (ConsultarListarCategoriasPorIdServico) | Leitura |
| HP-123 | GET | `/omnidesk/servicos/:idServico/categorias/:idAssociacao` | Omnidesk - Categorias do Servico | GET /omnidesk/servicos/{idServico}/categorias/{idAssociacao} (ConsultarListarAssServicoCategoriagoriaPorId) | Leitura |
| HP-124 | PATCH | `/omnidesk/servicos/:idServico/categorias/:idAssociacao/status` | Omnidesk - Categorias do Servico | PATCH /omnidesk/servicos/{idServico}/categorias/{idAssociacao}/status (AlterarStatusAssociacaoServico) | Mutação: validar massa/limpeza antes de executar |
| HP-125 | POST | `/omnidesk/servicos/:idServico/categorias` | Omnidesk - Categorias do Servico | POST /omnidesk/servicos/{idServico}/categorias (CriarAssociacaoServicoCategoria) | Mutação: validar massa/limpeza antes de executar |
| HP-126 | PUT | `/omnidesk/servicos/:idServico/categorias/:idAssociacao` | Omnidesk - Categorias do Servico | PUT /omnidesk/servicos/{idServico}/categorias/{idAssociacao} (AtualizarAssociacaoServicoCategoria) | Mutação: validar massa/limpeza antes de executar |
| HP-127 | GET | `/omnidesk/servicos-prestados` | Omnidesk - Servicos prestados | GET /omnidesk/servicos-prestados (ListarServicosPrestadosPaginado) | Leitura |
| HP-128 | GET | `/omnidesk/servicos-prestados/:id` | Omnidesk - Servicos prestados | GET /omnidesk/servicos-prestados/{id} (ListarServicosPrestadosPorId) | Leitura |
| HP-129 | GET | `/omnidesk/servicos-prestados/relatorio` | Omnidesk - Servicos prestados | GET /omnidesk/servicos-prestados/relatorio (GerarRelatorioServicosPrestados) | Leitura |
| HP-130 | PATCH | `/omnidesk/servicos-prestados/:id/status` | Omnidesk - Servicos prestados | PATCH /omnidesk/servicos-prestados/{id}/status (AlterarStatusServicosPrestados - inativar) | Mutação: validar massa/limpeza antes de executar |
| HP-131 | POST | `/omnidesk/servicos-prestados` | Omnidesk - Servicos prestados | POST /omnidesk/servicos-prestados (CriarServicosPrestados) | Mutação: validar massa/limpeza antes de executar |
| HP-132 | PUT | `/omnidesk/servicos-prestados/:id` | Omnidesk - Servicos prestados | PUT /omnidesk/servicos-prestados/{id} (AtualizarServicosPrestados) | Mutação: validar massa/limpeza antes de executar |
| HP-133 | GET | `/omnidesk/associacoes-servico-equipe` | Omnidesk - Equipes do Servico | GET /omnidesk/associacoes-servico-equipe (ListarAssociacaoServicoEquipePaginado) | Leitura |
| HP-134 | GET | `/omnidesk/servicos/:idServico/equipes` | Omnidesk - Equipes do Servico | GET /omnidesk/servicos/{idServico}/equipes (ConsultarEquipePorIdServico) | Leitura |
| HP-135 | GET | `/omnidesk/servicos/:idServico/equipes/:idAssociacao` | Omnidesk - Equipes do Servico | GET /omnidesk/servicos/{idServico}/equipes/{idAssociacao} (ConsultarAssociacaoServicoEquipePorId) | Leitura |
| HP-136 | PATCH | `/omnidesk/servicos/:idServico/equipes/:idAssociacao/status` | Omnidesk - Equipes do Servico | PATCH /omnidesk/servicos/{idServico}/equipes/{idAssociacao}/status (AlterarStatusAssociacaoServicoEquipe) | Mutação: validar massa/limpeza antes de executar |
| HP-137 | POST | `/omnidesk/servicos/:idServico/equipes` | Omnidesk - Equipes do Servico | POST /omnidesk/servicos/{idServico}/equipes (CriarAssociacaoServicoEquipe) | Mutação: validar massa/limpeza antes de executar |
| HP-138 | PUT | `/omnidesk/servicos/:idServico/equipes/:idAssociacao` | Omnidesk - Equipes do Servico | PUT /omnidesk/servicos/{idServico}/equipes/{idAssociacao} (AtualizarAssociacaoServicoEquipe) | Mutação: validar massa/limpeza antes de executar |
| HP-139 | PATCH | `/omnidesk/tickets/:idTicketHeader/tags/:idAssociacao/status` | Omnidesk - Etiquetas do Ticket | PATCH /omnidesk/tickets/{idTicketHeader}/tags/{idAssociacao}/status (AlterarStatusAssociacaoTicketsTags) | Mutação: validar massa/limpeza antes de executar |
| HP-140 | POST | `/omnidesk/tickets/{id}/tags` | Omnidesk - Etiquetas do Ticket | POST /omnidesk/tickets/{idTicketHeader}/tags (CriarAssociacaoTicketsTags) | Mutação: validar massa/limpeza antes de executar |
| HP-141 | PATCH | `/omnidesk/tickets-tags/:id/status` | Omnidesk - Catalogo de Etiquetas de Ticket | PATCH /omnidesk/tickets-tags/{id}/status (AlterarStatusTags) | Mutação: validar massa/limpeza antes de executar |
| HP-142 | GET | `/omnidesk/usuarios/:idUsuario/perfis` | Omnidesk - Perfis do Usuario | GET /omnidesk/usuarios/{idUsuario}/perfis (ConsultarAssociacaoUsuarioPerfilAcessoPorId) | Leitura |
| HP-143 | PATCH | `/cadastro/usuarios/{id}/perfis/{id}/status` | Cadastro - Perfis do Usuario | PATCH /cadastro/usuarios/{idUsuario}/perfis/{idPerfil}/status (AlterarStatusAssociacaoUsuarioPerfil) | Mutação: validar massa/limpeza antes de executar |
| HP-144 | POST | `/cadastro/usuarios/{id}/perfis` | Cadastro - Perfis do Usuario | POST /cadastro/usuarios/{idUsuario}/perfis (CriarAssociacaoUsuarioPerfil) | Mutação: validar massa/limpeza antes de executar |
| HP-145 | PUT | `/cadastro/usuarios/{id}/perfis/{id}` | Cadastro - Perfis do Usuario | PUT /cadastro/usuarios/{idUsuario}/perfis/{idAssociacao} (AtualizarAssociacaoUsuarioPerfilAcesso) | Mutação: validar massa/limpeza antes de executar |
| HP-146 | GET | `/omnidesk/integracoes-jira/condicoes-analise` | Omnidesk - Condicoes de analise da integracao | GET /omnidesk/integracoes-jira/condicoes-analise (ConsultarCentralIntegracaoCondAnalisePorIdConexao) | Leitura |
| HP-147 | GET | `/omnidesk/integracoes-jira/condicoes-analise/:id` | Omnidesk - Condicoes de analise da integracao | GET /omnidesk/integracoes-jira/condicoes-analise/{id} (ListarCentralIntegracaoCondicoesAnalisePorId) | Leitura |
| HP-148 | PATCH | `/omnidesk/integracoes-jira/condicoes-analise/:id/status` | Omnidesk - Condicoes de analise da integracao | PATCH /omnidesk/integracoes-jira/condicoes-analise/{id}/status (AlterarStatusCentralCondicoesAnalise) | Mutação: validar massa/limpeza antes de executar |
| HP-149 | POST | `/omnidesk/integracoes-jira/condicoes-analise` | Omnidesk - Condicoes de analise da integracao | POST /omnidesk/integracoes-jira/condicoes-analise (CriarCentralIntegracaoCondicoesAnalise) | Mutação: validar massa/limpeza antes de executar |
| HP-150 | PUT | `/omnidesk/integracoes-jira/condicoes-analise/:id` | Omnidesk - Condicoes de analise da integracao | PUT /omnidesk/integracoes-jira/condicoes-analise/{id} (AtualizaCentralCondicoesAnalise) | Mutação: validar massa/limpeza antes de executar |
| HP-151 | GET | `/omnidesk/integracoes-jira/correlacoes-campos/:id` | Omnidesk - Correlacao de campos da integracao | GET /omnidesk/integracoes-jira/correlacoes-campos/{id} (ListarCentralIntegracaoegrCorrelacaoCamposPorId) | Leitura |
| HP-152 | PATCH | `/omnidesk/integracoes-jira/correlacoes-campos/:id/status` | Omnidesk - Correlacao de campos da integracao | PATCH /omnidesk/integracoes-jira/correlacoes-campos/{id}/status (AlterarStatusCorrelacaoCampos) | Mutação: validar massa/limpeza antes de executar |
| HP-153 | POST | `/omnidesk/integracoes-jira/correlacoes-campos` | Omnidesk - Correlacao de campos da integracao | POST /omnidesk/integracoes-jira/correlacoes-campos (CriarCentralIntegracaoeCorrCampos) | Mutação: validar massa/limpeza antes de executar |
| HP-154 | PUT | `/omnidesk/integracoes-jira/correlacoes-campos/:id` | Omnidesk - Correlacao de campos da integracao | PUT /omnidesk/integracoes-jira/correlacoes-campos/{id} (AtualizarCentralIntegracaoeCorrCampos) | Mutação: validar massa/limpeza antes de executar |
| HP-155 | GET | `/omnidesk/categorias` | Omnidesk - Categorias | GET /omnidesk/categorias (ListarCategoriasPaginado) | Leitura |
| HP-156 | GET | `/omnidesk/categorias/:id` | Omnidesk - Categorias | GET /omnidesk/categorias/{id} (ListarCategoriasPorId) | Leitura |
| HP-157 | GET | `/omnidesk/categorias/relatorio` | Omnidesk - Categorias | GET /omnidesk/categorias/relatorio (GerarRelatorioCategorias) | Leitura |
| HP-158 | PATCH | `/omnidesk/categorias/:id/status` | Omnidesk - Categorias | PATCH /omnidesk/categorias/{id}/status (AlterarStatusCategorias) | Mutação: validar massa/limpeza antes de executar |
| HP-159 | POST | `/omnidesk/categorias` | Omnidesk - Categorias | POST /omnidesk/categorias (CriarCategoria) | Mutação: validar massa/limpeza antes de executar |
| HP-160 | PUT | `/omnidesk/categorias/{id}` | Omnidesk - Categorias | PUT /omnidesk/categorias/{id} (AtualizarCategoria) | Mutação: validar massa/limpeza antes de executar |
| HP-161 | GET | `/omnidesk/integracoes-jira/centrais` | Omnidesk - Centrais de integracao de tickets | GET /omnidesk/integracoes-jira/centrais (ListarCentralIntegracaoegracaoPaginado) | Leitura |
| HP-162 | GET | `/omnidesk/integracoes-jira/centrais/:id` | Omnidesk - Centrais de integracao de tickets | GET /omnidesk/integracoes-jira/centrais/{id} (ConsultarCentralIntegracaoegracaoTicketsPorId) | Leitura |
| HP-163 | GET | `/omnidesk/integracoes-jira/centrais/relatorio` | Omnidesk - Centrais de integracao de tickets | GET /omnidesk/integracoes-jira/centrais/relatorio (GerarRelatorioCentralIntegracaoegracaoTickets) | Leitura |
| HP-164 | PATCH | `/omnidesk/integracoes-jira/centrais/:id/status` | Omnidesk - Centrais de integracao de tickets | PATCH /omnidesk/integracoes-jira/centrais/{id}/status (AlterarStatusCentralIntegracaoegracaoTicket) | Mutação: validar massa/limpeza antes de executar |
| HP-165 | POST | `/omnidesk/integracoes-jira/centrais` | Omnidesk - Centrais de integracao de tickets | POST /omnidesk/integracoes-jira/centrais (CriarCentralIntegracaoegrTickets) | Mutação: validar massa/limpeza antes de executar |
| HP-166 | PUT | `/omnidesk/integracoes-jira/centrais/:id` | Omnidesk - Centrais de integracao de tickets | PUT /omnidesk/integracoes-jira/centrais/{id} (AtualizaCentralIntegracaoegracao) | Mutação: validar massa/limpeza antes de executar |
| HP-167 | GET | `/omnidesk/integracoes-jira/tipos` | Omnidesk - Tipos de integracao | GET /omnidesk/integracoes-jira/tipos (ConsultarCentralIntegracaoegracaoTiposPaginado) | Leitura |
| HP-168 | GET | `/omnidesk/integracoes-jira/tipos/:id` | Omnidesk - Tipos de integracao | GET /omnidesk/integracoes-jira/tipos/{id} (ListarCentralIntegracaoegrTiposPorId) | Leitura |
| HP-169 | GET | `/omnidesk/integracoes-jira/tipos/relatorio` | Omnidesk - Tipos de integracao | GET /omnidesk/integracoes-jira/tipos/relatorio (GerarRelatorioCentralIntegracaoegracaoTipos) | Leitura |
| HP-170 | GET | `/omnidesk/integracoes-jira/tipos/todos` | Omnidesk - Tipos de integracao | GET /omnidesk/integracoes-jira/tipos/todos (ListarTiposIntegracaoPorIdEmpresa) | Leitura |
| HP-171 | PATCH | `/omnidesk/integracoes-jira/tipos/:id/status` | Omnidesk - Tipos de integracao | PATCH /omnidesk/integracoes-jira/tipos/{id}/status (AlterarStatusTipos) | Mutação: validar massa/limpeza antes de executar |
| HP-172 | POST | `/omnidesk/integracoes-jira/tipos` | Omnidesk - Tipos de integracao | POST /omnidesk/integracoes-jira/tipos (CriarCentralIntegracaoegrTipos) | Mutação: validar massa/limpeza antes de executar |
| HP-173 | PUT | `/omnidesk/integracoes-jira/tipos/:id` | Omnidesk - Tipos de integracao | PUT /omnidesk/integracoes-jira/tipos/{id} (AtualizarCentralIntegrTipos) | Mutação: validar massa/limpeza antes de executar |
| HP-174 | GET | `/omnidesk/integracoes-jira/conexoes/:id` | Omnidesk - Conexao da integracao Jira | GET /omnidesk/integracoes-jira/conexoes/{id} (ConsultarCentralIntegracaoegrTicketsConexaoPorId) | Leitura |
| HP-175 | GET | `/omnidesk/integracoes-jira/conexoes/:id/quadro` | Omnidesk - Conexao da integracao Jira | GET /omnidesk/integracoes-jira/conexoes/{id}/quadro (ListarColunasQuadroJira) | Leitura |
| HP-176 | PATCH | `/omnidesk/integracoes-jira/conexoes/:id/status` | Omnidesk - Conexao da integracao Jira | PATCH /omnidesk/integracoes-jira/conexoes/{id}/status (AlterarStatusCentralConexao - inativar) | Mutação: validar massa/limpeza antes de executar |
| HP-177 | PUT | `/omnidesk/integracoes-jira/conexoes/:id` | Omnidesk - Conexao da integracao Jira | PUT /omnidesk/integracoes-jira/conexoes/{id} (AtualizarCentralIntegracaoTicketsConexao) | Mutação: validar massa/limpeza antes de executar |
| HP-178 | GET | `/omnidesk/associacoes-equipe-usuario` | Omnidesk - Equipes do Usuario | GET /omnidesk/associacoes-equipe-usuario (ListarEquipesUsuarios) | Leitura |
| HP-179 | GET | `/omnidesk/associacoes-equipe-usuario/equipes` | Omnidesk - Equipes do Usuario | GET /omnidesk/associacoes-equipe-usuario/equipes (ListarEquipesPorUsuario) | Leitura |
| HP-180 | GET | `/omnidesk/equipes/{id}/usuarios` | Omnidesk - Equipes do Usuario | GET /omnidesk/equipes/{id}/usuarios (ListarEquipesUsuarioAssociacaoPaginado) | Leitura |
| HP-181 | GET | `/omnidesk/equipes/{id}/usuarios/relatorio` | Omnidesk - Equipes do Usuario | GET /omnidesk/equipes/{id}/usuarios/relatorio (RelatorioEquipesUsuarioAssociacao) | Leitura |
| HP-182 | PATCH | `/omnidesk/equipes/:id/usuarios/:idAssociacao/status` | Omnidesk - Equipes do Usuario | PATCH /omnidesk/equipes/{id}/usuarios/{idAssociacao}/status (AlterarStatusUsuarioEquipe) | Mutação: validar massa/limpeza antes de executar |
| HP-183 | GET | `/omnidesk/justificativas` | Omnidesk - Justificativas de ticket | GET /omnidesk/justificativas (ListarJustTicketPaginado) | Leitura |
| HP-184 | GET | `/omnidesk/justificativas/:id` | Omnidesk - Justificativas de ticket | GET /omnidesk/justificativas/{id} (ConsultarJustTicketPorId) | Leitura |
| HP-185 | GET | `/omnidesk/justificativas/relatorio` | Omnidesk - Justificativas de ticket | GET /omnidesk/justificativas/relatorio (GerarRelatorioJustTicket) | Leitura |
| HP-186 | PATCH | `/omnidesk/justificativas/:id/status` | Omnidesk - Justificativas de ticket | PATCH /omnidesk/justificativas/{id}/status (AlterarStatusJustificativaTicket - inativar) | Mutação: validar massa/limpeza antes de executar |
| HP-187 | POST | `/omnidesk/justificativas` | Omnidesk - Justificativas de ticket | POST /omnidesk/justificativas (CriarJustificativaTicket) | Mutação: validar massa/limpeza antes de executar |
| HP-188 | PUT | `/omnidesk/justificativas/:id` | Omnidesk - Justificativas de ticket | PUT /omnidesk/justificativas/{id} (AtualizarJustificativaTicket) | Mutação: validar massa/limpeza antes de executar |
| HP-189 | GET | `/omnidesk/dashboard-administrativo/respostas-por-equipe` | Omnidesk - Dashboard administrativo | GET /omnidesk/dashboard-administrativo/respostas-por-equipe (ContarRespostasPorEquipe) | Leitura |
| HP-190 | GET | `/omnidesk/dashboard-administrativo/respostas-por-urgencia` | Omnidesk - Dashboard administrativo | GET /omnidesk/dashboard-administrativo/respostas-por-urgencia (ContarRespostasPorUrgencia) | Leitura |
| HP-191 | GET | `/omnidesk/dashboard-administrativo/tickets` | Omnidesk - Dashboard administrativo | GET /omnidesk/dashboard-administrativo/tickets (ListarEquipeUrgenciaPaginado) | Leitura |
| HP-192 | GET | `/omnidesk/perfil-acesso-tickets/por-perfil-acesso/{id}` | Omnidesk - Regras de ticket do perfil de acesso | GET /omnidesk/perfil-acesso-tickets/por-perfil-acesso/{idPerfilAcesso} (ConsultarPerfilAcessoTicketPorPerfilAcesso) | Leitura |
| HP-193 | PATCH | `/omnidesk/perfil-acesso-tickets/{id}/status` | Omnidesk - Regras de ticket do perfil de acesso | PATCH /omnidesk/perfil-acesso-tickets/{id}/status (AlterarStatusPerfilAcessoTicket) | Mutação: validar massa/limpeza antes de executar |
| HP-194 | POST | `/omnidesk/perfil-acesso-tickets` | Omnidesk - Regras de ticket do perfil de acesso | POST /omnidesk/perfil-acesso-tickets (CadPerfilAcessoTickets) | Mutação: validar massa/limpeza antes de executar |
| HP-195 | PUT | `/omnidesk/perfil-acesso-tickets/{id}` | Omnidesk - Regras de ticket do perfil de acesso | PUT /omnidesk/perfil-acesso-tickets/{id} (AtualizarPerfilAcessoTickets) | Mutação: validar massa/limpeza antes de executar |
| HP-196 | GET | `/omnidesk/status-ticket` | Omnidesk - Status ticket | GET /omnidesk/status-ticket (ListarStatusTicketPaginado) | Leitura |
| HP-197 | GET | `/omnidesk/status-ticket/:id` | Omnidesk - Status ticket | GET /omnidesk/status-ticket/:id (ListarStatusTicketPorId) | Leitura |
| HP-198 | GET | `/omnidesk/status-ticket/lista` | Omnidesk - Status ticket | GET /omnidesk/status-ticket/lista (ListarStatusTicket) | Leitura |
| HP-199 | GET | `/omnidesk/status-ticket/relatorio` | Omnidesk - Status ticket | GET /omnidesk/status-ticket/relatorio (GerarRelatorioStatusTicket) | Leitura |
| HP-200 | PATCH | `/omnidesk/status-ticket/:id/status` | Omnidesk - Status ticket | PATCH /omnidesk/status-ticket/{id}/status (AlterarStatusStatusTicket) | Mutação: validar massa/limpeza antes de executar |
| HP-201 | POST | `/omnidesk/status-ticket` | Omnidesk - Status ticket | POST /omnidesk/status-ticket (CriarStatusTicket) | Mutação: validar massa/limpeza antes de executar |
| HP-202 | PUT | `/omnidesk/status-ticket/:id` | Omnidesk - Status ticket | PUT /omnidesk/status-ticket/{id} (AlterarStatusTicket) | Mutação: validar massa/limpeza antes de executar |
| HP-203 | GET | `/omnidesk/templates` | Omnidesk - Templates | GET /omnidesk/templates (ListarTemplate) | Leitura |
| HP-204 | GET | `/omnidesk/templates/{id}` | Omnidesk - Templates | GET /omnidesk/templates/{id} (ListarTemplatePorId) | Leitura |
| HP-205 | PATCH | `/omnidesk/templates/{id}/status` | Omnidesk - Templates | PATCH /omnidesk/templates/{id}/status (AlterarStatusTemplate) | Mutação: validar massa/limpeza antes de executar |
| HP-206 | POST | `/omnidesk/templates` | Omnidesk - Templates | POST /omnidesk/templates (CriarTemplate) | Mutação: validar massa/limpeza antes de executar |
| HP-207 | PUT | `/omnidesk/templates/{id}` | Omnidesk - Templates | PUT /omnidesk/templates/{id} (EditarTemplate) | Mutação: validar massa/limpeza antes de executar |
| HP-208 | GET | `/omnidesk/perfis-acesso` | Omnidesk - Perfis de Acesso | GET /omnidesk/perfis-acesso (ConsultarPerfilAcessoPaginado) | Leitura |
| HP-209 | GET | `/omnidesk/perfis-acesso/{id}` | Omnidesk - Perfis de Acesso | GET /omnidesk/perfis-acesso/{id} (ConsultarPerfilAcesso) | Leitura |
| HP-210 | GET | `/omnidesk/perfis-acesso/relatorio` | Omnidesk - Perfis de Acesso | GET /omnidesk/perfis-acesso/relatorio (GerarRelatorioPerfilAcesso) | Leitura |
| HP-211 | PATCH | `/omnidesk/perfis-acesso/:id/status` | Omnidesk - Perfis de Acesso | PATCH /omnidesk/perfis-acesso/{id}/status (AlterarStatusPerfilAcesso: inativar) | Mutação: validar massa/limpeza antes de executar |
| HP-212 | POST | `/omnidesk/perfis-acesso` | Omnidesk - Perfis de Acesso | POST /omnidesk/perfis-acesso (CriarPerfilAcesso: nome livre, insercao) | Mutação: validar massa/limpeza antes de executar |
| HP-213 | PUT | `/omnidesk/perfis-acesso/:id` | Omnidesk - Perfis de Acesso | PUT /omnidesk/perfis-acesso/{id} (AtualizarPerfilAcesso) | Mutação: validar massa/limpeza antes de executar |
| HP-214 | PATCH | `/omnidesk/ticket-items/:id/status-notificacao` | Omnidesk - Interações do Ticket | PATCH /omnidesk/ticket-items/{id}/status-notificacao (AlterarStatusNotificacaoTicketItemPorId) | Mutação: validar massa/limpeza antes de executar |
| HP-215 | PATCH | `/omnidesk/ticket-items/{id}/status` | Omnidesk - Interações do Ticket | PATCH /omnidesk/ticket-items/{id}/status (AtivarOuInativarInteracaoDoTicket) | Mutação: validar massa/limpeza antes de executar |
| HP-216 | PUT | `/omnidesk/ticket-items/:id` | Omnidesk - Interações do Ticket | PUT /omnidesk/ticket-items/{id} (AtualizarInteracaoDoTicket) | Mutação: validar massa/limpeza antes de executar |
| HP-217 | GET | `/omnidesk/tickets-tags` | Omnidesk - Etiquetas de ticket (catalogo) | GET /omnidesk/tickets-tags (ListarTagsPaginado) | Leitura |
| HP-218 | PUT | `/omnidesk/tickets-tags/:id` | Omnidesk - Etiquetas de ticket (catalogo) | PUT /omnidesk/tickets-tags/{id} (AtualizarTags) | Mutação: validar massa/limpeza antes de executar |
| HP-219 | GET | `/omnidesk/ticket-interacoes` | Omnidesk - Interacoes de ticket | GET /omnidesk/ticket-interacoes?idTicketHeader= (ListarTicketItem) | Leitura |
| HP-220 | GET | `/omnidesk/ticket-interacoes/paginado` | Omnidesk - Interacoes de ticket | GET /omnidesk/ticket-interacoes/paginado (ListarTicketItemPaginado) | Leitura |
| HP-221 | PATCH | `/omnidesk/ticket-interacoes/status-notificacao` | Omnidesk - Interacoes de ticket | PATCH /omnidesk/ticket-interacoes/status-notificacao (AlterarStatusNotificacaoTicketItemPorIds) | Mutação: validar massa/limpeza antes de executar |
| HP-222 | POST | `/omnidesk/ticket-interacoes` | Omnidesk - Interacoes de ticket | POST /omnidesk/ticket-interacoes (AdicionarInteracaoAoTicket) | Mutação: validar massa/limpeza antes de executar |
| HP-223 | DELETE | `/omnidesk/configuracoes-smtp/{id}` | Omnidesk - Configurações SMTP | DELETE /omnidesk/configuracoes-smtp/{id} (excluir) | Mutação: validar massa/limpeza antes de executar |
| HP-224 | GET | `/omnidesk/configuracoes-smtp` | Omnidesk - Configurações SMTP | GET /omnidesk/configuracoes-smtp (lista paginada + RSQL) | Leitura |
| HP-225 | GET | `/omnidesk/configuracoes-smtp/{id}` | Omnidesk - Configurações SMTP | GET /omnidesk/configuracoes-smtp/{id} | Leitura |
| HP-226 | POST | `/omnidesk/configuracoes-smtp` | Omnidesk - Configurações SMTP | POST /omnidesk/configuracoes-smtp (cadastrar) | Mutação: validar massa/limpeza antes de executar |
| HP-227 | PUT | `/omnidesk/configuracoes-smtp/{id}` | Omnidesk - Configurações SMTP | PUT /omnidesk/configuracoes-smtp/{id} | Mutação: validar massa/limpeza antes de executar |

## Rotas sem candidato positivo (2)

| Método e rota | Requests encontrados |
|---|---|
| PUT /omnidesk/justificativas/{id} | PUT /omnidesk/justificativas/{id} (id = 0: 400, nao 404) |
| PATCH /omnidesk/justificativas/{id}/status | PATCH /omnidesk/justificativas/{id}/status (id = 0: 400, nao 404) |
