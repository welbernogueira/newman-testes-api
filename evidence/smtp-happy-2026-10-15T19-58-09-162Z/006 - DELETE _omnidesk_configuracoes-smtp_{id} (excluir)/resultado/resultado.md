# Resultado: DELETE /omnidesk/configuracoes-smtp/{id} (excluir)

**Status:** APROVADO

## Resultado esperado

Requer OMNIDESK.SMTP_CONFIGURACAO.EXCLUIR. Exclusao logica que apaga a senha (idempotente); a conta padrao nao pode ser excluida (409).

## Resultado observado

### Tentativa 1
- **HTTP:** 204 No Content
- **Tempo de resposta:** 3381 ms
- **Validações Newman:**
  - PASSOU: DELETE exclui a configuração criada neste run com HTTP 204

Os corpos são removidos; somente metadados sanitizados são preservados.

## Divergências e observações

- Divergências e bloqueios estão registrados acima a partir do resultado Newman.
