# POST /oauth/login  <-- comece por aqui

- **Status:** APROVADO
- **Identificador Newman:** 0db94435-99fc-4083-a6af-ae045c7279dd
- **Grupo/pasta:** Autenticação
- **Método:** POST
- **Resultado esperado informado na coleção:**

Troca usuario e senha por token. O script de teste guarda access_token e refresh_token nas variaveis da collection, e os demais requests herdam o bearer.

Preencha `username` e `password` no environment. Nenhum client_secret e necessario: ele fica no servidor da API.

NAO use token obtido direto no Keycloak, nem token do ShowNet: a API so aceita o realm `omnidesk`.

COMO LER A RESPOSTA

  Connection refused / socket hang up
     A API nao esta rodando. Nao e erro de token.

  401 em endpoint de negocio
     O token nao foi aceito. Quase sempre e token do realm errado:
     a API so aceita o realm `omnidesk`. Token do ShowNet / `Omnilink PRD`
     (client `omnilink-php`) e recusado no issuer, por mais valido que seja.
     Confira a claim `iss` do seu token em jwt.io.

  403 em endpoint de negocio
     O token foi ACEITO. Falta permissao. Renovar ou logar de novo nao resolve:
     as permissoes vem de OMNIDESK.usuarios, e nao do token.
     Causas, em ordem de frequencia: o usuario nao existe em OMNIDESK.usuarios;
     existe mas sem perfil; ou o perfil nao tem a permissao do endpoint.

  404 em GET /{id}
     Pode ser id inexistente OU registro de outra empresa. A API nao distingue
     de proposito. Nao trate como 'registro apagado'.

PRE-REQUISITO DO USUARIO

  O login precisa existir NOS DOIS LADOS, com o mesmo e-mail:
    1. no realm `omnidesk` do Keycloak (credencial), e
    2. em OMNIDESK.usuarios, ativo e com perfil (permissoes).

  A correlacao e feita pela claim `email`, nao pelo username.
  Usuario criado por POST /cadastro/usuarios nasce nos dois lados.
  Criado direto no Keycloak recebe token valido e nenhuma permissao (403).

- **Coleção:** ../../../postman/Omnidelicias-SMTP-Happy-Path.postman_collection.json
- **Relatório da rodada:** ../../../reports/smtp-happy-2026-10-15T19-58-09-162Z.json

## Evidências desta execução

Esta etapa foi executada via Newman em chamadas HTTP; não houve sessão de navegador. Não foi gerado vídeo nem captura de interface. Status, assertions e resumo sanitizado estão no relatório Newman e em resultado/resultado.md.
