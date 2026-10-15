# Resultado: GET /omnidesk/configuracoes-smtp (lista paginada + RSQL)

**Status:** APROVADO

## Resultado esperado

Requer OMNIDESK.SMTP_CONFIGURACAO.LISTAR. So configuracoes ativas; operador preso a empresa so ve a dele. Cada item traz padrao e razaoSocial.

## Resultado observado

### Tentativa 1
- **HTTP:** 200 OK
- **Tempo de resposta:** 3858 ms
- **Validações Newman:**
  - PASSOU: GET lista SMTP responde HTTP 200
  - PASSOU: GET lista contém somente o registro criado por este run

Os corpos são removidos; somente metadados sanitizados são preservados.

## Divergências e observações

- Divergências e bloqueios estão registrados acima a partir do resultado Newman.
