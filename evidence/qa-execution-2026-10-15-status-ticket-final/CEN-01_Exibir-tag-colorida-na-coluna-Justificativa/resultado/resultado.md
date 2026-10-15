## CEN-01 — Exibir tag colorida na coluna Justificativa

- Linha da matriz: 2; identificador derivado da ordem, pois o Excel não tem coluna de identificador.
- Status: BLOQUEADO (na planilha: ⚠️ IMPEDIDO).

### Passos originais do Excel

1. Acessar a tela Status de Ticket.
2. Localizar a coluna Justificativa.
3. Conferir registros Obrigatória e Opcional.

### Resultado esperado

A coluna deve exibir tags coloridas identificando corretamente Obrigatória e Opcional.

### Resultado obtido

BLOQUEADO. O pré-check retornou 11 justificativas e 10 status-ticket, ambos HTTP 200. Porém, justificativa nos 10 status é numérica; a API não comprova quais registros representam Obrigatória e Opcional. A interface não carregou, então nenhuma tag ou cor foi observada.

### Resultado de cada passo

1. Acessar a tela Status de Ticket: BLOQUEADO; localhost:4200 não abriu.
2. Localizar a coluna Justificativa: NÃO EXECUTADO.
3. Conferir registros Obrigatória e Opcional: NÃO EXECUTADO; a classificação visual não foi observada.

### Pré-checks realmente executados

1. GET /actuator/health em localhost:8080: HTTP 200.
2. Login de teste para chamadas somente de leitura: HTTP 200; token mantido em memória e descartado ao encerrar.
3. Consultas GET de pré-requisito: ver complementares/api-prechecks.json. Nenhum POST/PUT foi enviado.
4. Tentativa de abrir http://localhost:4200/: navegador exibiu “A navegação para a página da Web foi cancelada”; portas 4200 e 5173 sem listener.
5. Execução parada antes dos passos visuais.

### Evidências

- Captura real destacada: prints/resultado/01-interface-indisponivel.png.
- Pré-check autenticado sanitizado: complementares/api-prechecks.json.
- Nenhuma tela funcional ou vídeo do cenário: o fluxo visual não começou.

### Dependência

Front-end de Status de Ticket acessível, configurado para a API deste ambiente e com permissão para visualizar, cadastrar e editar.
