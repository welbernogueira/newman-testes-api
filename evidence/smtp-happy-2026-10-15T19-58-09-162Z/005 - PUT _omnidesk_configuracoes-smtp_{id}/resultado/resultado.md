# Resultado: PUT /omnidesk/configuracoes-smtp/{id}

**Status:** APROVADO

## Resultado esperado

Requer OMNIDESK.SMTP_CONFIGURACAO.ATUALIZAR. senha nula/em branco mantem a atual. padrao=true troca a conta padrao (administrador global); padrao=false na padrao responde 409.

## Resultado observado

### Tentativa 1
- **HTTP:** 200 OK
- **Tempo de resposta:** 3903 ms
- **Validações Newman:**
  - PASSOU: PUT edita configuração SMTP com HTTP 200
  - PASSOU: PUT aplica porta e segurança
  - PASSOU: PUT sem senha mantém senha cadastrada

Os corpos são removidos; somente metadados sanitizados são preservados.

## Divergências e observações

- Divergências e bloqueios estão registrados acima a partir do resultado Newman.
