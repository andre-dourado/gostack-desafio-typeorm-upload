<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Desafio 05: Banco de dados e upload de arquivos no Node.js
</h3>

Nesse desafio foi continuado o desenvolvimento da aplicação de gestão de transações, treinando o que foi aprendido até agora no Node.js junto e TypeScript, mas dessa vez incluindo o uso de banco de dados com o TypeORM e envio de arquivos com o Multer!

Essa aplicação armazena transações financeiras de entrada e saída e permite o cadastro e a listagem dessas transações, além de permitir a geração de relatórios a partir do envio de um arquivo csv.

## Rotas da aplicação

- **`POST /transactions`**: A rota recebe title, value, type, e category dentro do corpo da requisição, sendo o type o tipo da transação, que deve ser income para entradas (depósitos) e outcome para saídas (retiradas). Ao cadastrar uma nova transação, ela armazena dentro do banco de dados, com os campos id, title, value, type, category_id, created_at, updated_at.

- **`GET /transactions`**: Essa rota retorna uma listagem com todas as transações que cadastrou até agora, junto com o valor da soma de entradas, retiradas e total de crédito.

- **`DELETE /transactions/:id`**: A rota deleta uma transação com o id presente nos parâmetros da rota;

- **˜POST /transactions/import: A rota permite a importação de um arquivo com formato .csv contendo as mesmas informações necessárias para criação de uma transação id, title, value, type, category_id, created_at, updated_at, onde cada linha do arquivo CSV é um novo registro para o banco de dados, e por fim retorna todas as transactions que foram importadas para o banco de dados.
