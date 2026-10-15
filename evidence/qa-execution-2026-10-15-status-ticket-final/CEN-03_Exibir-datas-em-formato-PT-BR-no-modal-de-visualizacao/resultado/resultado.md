## CEN-03 — Exibir datas em formato PT-BR no modal de visualização

- Linha da matriz: 4; identificador derivado da ordem, pois o Excel não tem coluna de identificador.
- Status: BLOQUEADO (na planilha: ⚠️ IMPEDIDO).

### Passos originais do Excel

1. Acessar a tela Status de Ticket.
2. Abrir o modal de visualização de um registro com datas.
3. Conferir todas as datas exibidas.

### Resultado esperado

As datas no modal devem ser exibidas em formato brasileiro (PT-BR), de forma consistente e legível. O padrão exato não foi especificado.

### Resultado obtido

BLOQUEADO. GET /omnidesk/status-ticket/lista respondeu 200; 10/10 registros tinham dataCadastro e dataUpdate presentes e parseáveis. Não foi possível abrir o modal para verificar a apresentação em PT-BR.

### Resultado de cada passo

1. Acessar a tela Status de Ticket: BLOQUEADO; localhost:4200 não abriu.
2. Abrir o modal de visualização: NÃO EXECUTADO.
3. Conferir todas as datas em PT-BR: NÃO EXECUTADO; a API não valida o formato renderizado.

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
