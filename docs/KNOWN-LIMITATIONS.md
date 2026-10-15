# Limitações conhecidas

- O gerador seleciona cenários positivos por heurística no nome dos requests e valida apenas status HTTP 2xx. Os 227 cenários são candidatos para a primeira etapa, não assertions completas de contrato.
- A origem contém 229 combinações método/rota. Duas operações de justificativas só têm requests negativos e seguem sem happy path.
- A execução `happy-read` do environment OMNIDESK realizou 131 requests (login + 130 GETs): 109 respostas 2xx, 21 respostas não 2xx e um timeout. IDs e parâmetros existentes na collection não representam uma massa padronizada; boa parte dos 400/404/409 precisa de fixtures corretas antes de classificar como defeito.
- Os 22 resultados não 2xx (5 respostas 400, 15 respostas 404, uma resposta 409 e um timeout) estão listados no relatório HTML/JSON e devem ser revistos com o contrato e a massa de homologação.
- Os cenários POST/PUT/PATCH/DELETE ainda carregam exemplos e IDs estáticos da collection original. Não foram executados. A seleção completa exige massa exclusiva, IDs dinâmicos e limpeza revisada.
- O environment OMNIDESK é local e ignorado pelo Git. Nunca anexar o export original em um card; os relatórios Newman gerados pelo runner omitem valores de ambiente, headers e corpos.
