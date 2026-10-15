## CEN-04 — Remover asteriscos no cadastro

- Linha da matriz: 5; identificador derivado da ordem, pois o Excel não tem coluna de identificador.
- Status: BLOQUEADO (na planilha: ⚠️ IMPEDIDO).

### Passos originais do Excel

1. Iniciar o cadastro de um status.
2. Conferir os campos que já iniciam com item selecionado.
3. Verificar se exibem asterisco de obrigatoriedade.

### Resultado esperado

Os campos que já iniciam com um item selecionado não devem exibir asterisco de obrigatoriedade no cadastro.

### Resultado obtido

BLOQUEADO. Não foi possível abrir a tela nem o formulário de cadastro. A presença de valores iniciais e os asteriscos não foram observados. Nenhum POST ou dado de cadastro foi enviado.

### Resultado de cada passo

1. Iniciar o cadastro: NÃO EXECUTADO; a tela não carregou.
2. Conferir os campos com item pré-selecionado: NÃO EXECUTADO.
3. Verificar os asteriscos de obrigatoriedade: NÃO EXECUTADO.

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
