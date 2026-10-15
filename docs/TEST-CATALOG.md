# Catálogo de cenários

O catálogo inicial completo é gerado em [ENDPOINT-CATALOG.md](ENDPOINT-CATALOG.md). Ele associa cada ID `HP-nnn` a um método, rota, pasta e request de origem.

## Execução inicial

O relatório `happy-read` cobre login e requests GET. A coleção gerada contém também cenários candidatos para os métodos POST, PUT, PATCH e DELETE, mas a execução dessas operações fica pendente até que cada fluxo use IDs criados durante o teste e tenha limpeza definida.

## Critérios para promover um cenário

- Identificar o contrato e o status esperado do endpoint.
- Usar variáveis para IDs e dados de teste, sem depender de registros fixos compartilhados.
- Validar corpo, campos obrigatórios, paginação e efeitos esperados.
- Para mutações, provar que a massa é exclusiva e limpar apenas registros criados pelo cenário.
- Registrar a evidência do run pelo ID do cenário e relatório Newman.
