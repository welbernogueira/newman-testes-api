# Resultado: POST /omnidesk/configuracoes-smtp (cadastrar)

**Status:** APROVADO

## Resultado esperado

Requer OMNIDESK.SMTP_CONFIGURACAO.CRIAR. idEmpresa precisa ser a empresa do usuario autenticado (400 se outra; administrador global informa qualquer uma). Uma configuracao ativa por empresa (409 na segunda). padrao=true exige administrador global. Preencha a variavel smtpSenha so localmente - nao salve a senha na collection.

## Resultado observado

### Tentativa 1
- **HTTP:** 201 Created
- **Tempo de resposta:** 4028 ms
- **Validações Newman:**
  - PASSOU: POST cria configuração SMTP com HTTP 201

Os corpos são removidos; somente metadados sanitizados são preservados.

## Divergências e observações

- Divergências e bloqueios estão registrados acima a partir do resultado Newman.
