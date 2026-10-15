# Estratégia de testes

## Etapa inicial: happy paths

`postman/Omnidelicias-API.postman_collection.json` preserva a collection de origem. O gerador agrupa requests por método e template da rota, escolhe um cenário sem marcador negativo e cria `postman/Omnidelicias-Happy-Paths.postman_collection.json`. Na geração atual há 229 combinações método/rota; 227 têm um candidato positivo. Duas rotas de justificativa só têm exemplos inválidos na origem e estão registradas como pendentes em `ENDPOINT-CATALOG.md`.

Cada cenário gerado valida HTTP 2xx. Essa é uma primeira verificação de rota. Os cenários seguintes devem adicionar assertions de schema, conteúdo e regras de negócio com base no contrato de cada endpoint.

## Execução

- `npm run test:happy:read`: login mais todos os GETs selecionados; não executa operações de escrita.
- `npm run test:happy`: seleção completa, incluindo POST, PUT, PATCH e DELETE. Exige `ALLOW_DESTRUCTIVE=true` e `HAPPY_PATH_FIXTURES_READY=true`; use só depois de trocar IDs fixos por massa isolada e definir limpeza.
- `npm run test:smtp`: requests CRUD originais de SMTP; também é mutável e usa IDs estáticos, portanto requer as mesmas confirmações e revisão antes de execução.

Configure `POSTMAN_ENV` com o environment autorizado. JSON e HTML são gravados em `reports/`; os relatórios removem headers, corpos e valores de variáveis do environment.

## Próximas etapas

1. Corrigir fixtures e parâmetros dos GETs que responderam 400/404/409 ou timeout.
2. Preparar dados exclusivos por domínio e IDs dinâmicos para os fluxos de escrita, com limpeza garantida.
3. Trocar assertions genéricas 2xx por validações de contrato e comportamento.
4. Expandir negativos, permissões, concorrência e regressão depois da cobertura inicial positiva.

Newman executa testes funcionais sequenciais; não mede capacidade ou carga.
