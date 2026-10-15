# SMTP CRUD: happy path

## Escopo

Fluxo isolado da pasta `Omnidesk - Configurações SMTP`:

1. Login no ambiente OMNIDESK.
2. POST de uma configuração exclusiva para a empresa informada.
3. GET da lista com filtro por empresa e identificação pelo marcador deste run.
4. GET da configuração criada por ID.
5. PUT alterando porta e segurança, sem enviar uma nova senha.
6. DELETE da configuração criada.

O ID usado nas operações por ID vem do item encontrado na listagem. Se a listagem não confirmar o marcador exclusivo, a execução para sem chamar DELETE com um ID não confirmado. As chamadas são sequenciais e não são testes de carga.

## Última execução

Data: 2026-10-15

Resultado: 6 requests (login + 5 SMTP), 11 assertions aprovadas, 0 falhas.

| Etapa | Resultado |
| --- | ---: |
| Login | 200 |
| POST criar | 201 |
| GET lista | 200 |
| GET por ID | 200 |
| PUT atualizar | 200 |
| DELETE limpar registro do run | 204 |

Relatórios sanitizados:

- `reports/smtp-happy-2026-10-15T19-02-55-664Z.html`
- `reports/smtp-happy-2026-10-15T19-02-55-664Z.json`

## Comando

```powershell
$env:POSTMAN_ENV = "postman/environments/OMNIDESK.json"
$env:SMTP_TEST_ID_EMPRESA = "1"
$env:ALLOW_DESTRUCTIVE = "true"
npm run test:smtp:happy
```

Altere `SMTP_TEST_ID_EMPRESA` para a empresa de homologação apropriada. O arquivo de environment contém credenciais e não deve ser versionado. Os próximos cenários podem ampliar este grupo com validações negativas e regras de negócio sem misturar outras áreas da API.
