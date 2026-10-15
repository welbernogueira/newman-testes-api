# Resultado: GET /omnidesk/configuracoes-smtp/{id}

**Status:** APROVADO

## Resultado esperado

Requer OMNIDESK.SMTP_CONFIGURACAO.CONSULTAR. Sem senha; senhaCadastrada informa se existe uma.

## Resultado observado

### Tentativa 1
- **HTTP:** 200 OK
- **Tempo de resposta:** 3804 ms
- **Validações Newman:**
  - PASSOU: GET por ID responde HTTP 200
  - PASSOU: Consulta não devolve a senha
  - PASSOU: Consulta informa senha cadastrada

Os corpos são removidos; somente metadados sanitizados são preservados.

## Divergências e observações

- Divergências e bloqueios estão registrados acima a partir do resultado Newman.
