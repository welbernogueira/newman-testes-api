# POST /omnidesk/configuracoes-smtp (cadastrar)

- **Status:** APROVADO
- **Identificador Newman:** 78d0d3cc-4f82-413e-95ef-339150a122ef
- **Grupo/pasta:** Omnidesk - Configurações SMTP - Happy Path
- **Método:** POST
- **Resultado esperado informado na coleção:**

Requer OMNIDESK.SMTP_CONFIGURACAO.CRIAR. idEmpresa precisa ser a empresa do usuario autenticado (400 se outra; administrador global informa qualquer uma). Uma configuracao ativa por empresa (409 na segunda). padrao=true exige administrador global. Preencha a variavel smtpSenha so localmente - nao salve a senha na collection.

- **Coleção:** ../../../postman/Omnidelicias-SMTP-Happy-Path.postman_collection.json
- **Relatório da rodada:** ../../../reports/smtp-happy-2026-10-15T19-58-09-162Z.json

## Evidências desta execução

Esta etapa foi executada via Newman em chamadas HTTP; não houve sessão de navegador. Não foi gerado vídeo nem captura de interface. Status, assertions e resumo sanitizado estão no relatório Newman e em resultado/resultado.md.
