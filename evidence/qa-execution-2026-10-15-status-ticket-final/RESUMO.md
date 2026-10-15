## Resumo da rodada QA — Status de Ticket, Tags, Datas e Asteriscos

- Identificador: qa-execution-2026-10-15-status-ticket-final.
- Roteiro: [planilha oficial preenchida](../../docs/Matriz_QA_Omnidesk_StatusTicket_Tags_Datas_Asteriscos_FINAL_2026-10-15.xlsx), linhas 2–6, ordem original preservada.
- A planilha não tem coluna de ID; CEN-01 a CEN-05 identificam as linhas na mesma ordem.
- Cenários: 5. APROVADO: 0. REPROVADO: 0. BLOQUEADO: 5 (na coluna Veredito do Excel: ⚠️ IMPEDIDO).
- Cenários não executados visualmente: 5, todos registrados como BLOQUEADO. Pendentes sem classificação: 0. Etapas visuais concluídas: 0/5.

### Pré-check técnico

Health da API: 200; login: 200; GET tags: 200 (10 registros); GET justificativas: 200 (11); GET status-ticket: 200 (10). Os 10 status tinham dataCadastro e dataUpdate presentes e parseáveis. O campo justificativa veio numérico; o pré-check não confirma o mapeamento Obrigatória/Opcional. Detalhes sanitizados: preflight/api-prechecks.json.

A interface local não estava disponível: localhost:4200 exibiu “A navegação para a página da Web foi cancelada”; portas 4200 e 5173 estavam sem listener. A captura real com o erro destacado está em [frontend-localhost-4200-indisponivel.png](preflight/frontend-localhost-4200-indisponivel.png) e na pasta individual de cada cenário. Os HTTP 200 provam somente disponibilidade e dados da API; não aprovam validações visuais.

Dependência para concluir: front-end de Status de Ticket acessível, configurado para esta API e com permissões para visualizar, cadastrar e editar. Nenhum POST/PUT foi enviado e nenhum vídeo de cenário foi fabricado.
