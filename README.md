# API de Jogos com Node.js, Express e MySQL

API REST para cadastro e gerenciamento de jogos, com usuários, autenticação por JWT e persistência relacional em MySQL. O projeto usa Sequelize para mapear os modelos e relacionar cada jogo às suas informações complementares.

## Tecnologias

- Node.js com módulos ES
- Express e CORS
- MySQL, `mysql2` e Sequelize
- JWT (`jsonwebtoken`) para autenticação
- `dotenv` para configuração por variáveis de ambiente

## Requisitos

- Node.js e npm instalados
- MySQL em execução e um usuário com permissão para criar o banco de dados configurado

## Como executar

1. Clone o repositório e entre na pasta do projeto.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto:

   ```env
   DB_HOST=localhost
   DB_NAME=api_games
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   PORT=4000
   ```

   `DB_HOST` é opcional e assume `localhost`; `PORT` é opcional e assume `4000`. Na inicialização, a aplicação cria o banco informado em `DB_NAME` se ele ainda não existir e sincroniza as tabelas com os modelos.

4. Inicie a API:

   ```bash
   npm start
   ```

A API ficará disponível em `http://localhost:4000` (ou na porta definida em `PORT`). O comando `start` usa Nodemon para iniciar `index.js`.

## Endpoints

As rotas são montadas na raiz da API. As rotas de jogos exigem um token JWT; cadastro e login não exigem autenticação.

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| `POST` | `/user` | Não | Cadastra um usuário (`name`, `email`, `password`) |
| `POST` | `/auth` | Não | Autentica o usuário com `email` e `password`; retorna um token JWT |
| `GET` | `/games` | JWT | Lista os jogos com suas descrições |
| `GET` | `/games/:id` | JWT | Consulta um jogo pelo ID |
| `POST` | `/games` | JWT | Cadastra um jogo e sua descrição |
| `PUT` | `/games/:id` | JWT | Atualiza os dados do jogo e de sua descrição |
| `DELETE` | `/games/:id` | JWT | Remove o jogo; a descrição associada é removida em cascata |

Para chamar uma rota protegida, envie o token recebido no login no cabeçalho:

```http
Authorization: Bearer SEU_TOKEN
```

### Exemplo: cadastrar um jogo

Envie `Content-Type: application/json` e um corpo como:

```json
{
  "title": "The Last of Us",
  "year": 2013,
  "price": 99.90,
  "platform": "PlayStation 3",
  "genre": "Ação/Aventura",
  "rating": "18+"
}
```

Os campos `title`, `year` e `price` pertencem ao jogo. `platform`, `genre` e `rating` são armazenados na descrição relacionada. O cadastro de usuário recebe `name`, `email` e `password`; o login recebe `email` e `password`.

## Organização do projeto

```text
config/        conexão com o MySQL e configuração do Sequelize
controllers/   tratamento das requisições e respostas HTTP
middleware/    validação do token JWT
models/        modelos Game, User e Description e seus relacionamentos
routes/        rotas de jogos e usuários
services/      operações de acesso e persistência dos dados
index.js       configuração e inicialização do servidor
```

## Segurança

O código atual contém um segredo JWT fixo no controlador de usuários e grava/compara senhas sem hash. **Este projeto deve ser tratado como exemplo de desenvolvimento**: antes de expô-lo publicamente ou utilizá-lo em produção, mova o segredo para uma variável de ambiente e implemente armazenamento de senhas com hash seguro. Não publique credenciais do MySQL no repositório.
