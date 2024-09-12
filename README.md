# Counter Strike Skins Backend Project

Um projeto [Next.js] focado na execução do desafio de backend.

## instalação

Use o comando `npm install` para a instalação das dependencias do projeto na sua máquina.

## para começar

O próximo passo é inicializar a aplicação através de um desses comandos:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Depois, adicionar a URL do seu mongo no arquivo .env

> [!WARNING]
> deve conter a URL correta do MongoDB.

> [!WARNING]
> É de muita importancia verificar se o seu IP acess list no mongoDB está correto.

## Funcionalidades

### 1. Listagem de skins Counter Strike
   - O usuário pode visualizar uma lista de skins disponíveis em alguma plataforma de API como: POSTMAN/INSOMNIA.
   - Se o usuário quiser uma filtragem mais detalhada ele pode acessar os query params de pesquisa pela URL tais como: float, preço, e personalizar a ordem de skins!

## Exemplos de uso

### GET/items
  - Nessa rota você pode acessar, e ver todos os items que estão guardados no seu banco de dados (MongoDB)
  - Você poderá ver as informações: nome, preço, categoria, imagem, float, id, data de criação e data de atualização.

### POST/items
  - Você também pode customizar items, adicionar novos items acessando a rota POST

### DELETE/items/:id
  - Você pode `DELETAR` um item passando o id dele como parametro de requisição  
   
## Uso do query params
  - Você pode fazer requisições GET com parâmetros de ordenação: [http://localhost:3000/items?orderBy=price&sortOrder=asc]
  - Esse é somente um exemplo dentro de vários parametros diferentes que você poderá usar!

## Decisões técnicas tomadas

 - As decisões técnicas do projeto envolveram primeiro configurar o Prisma para mapear o modelo de skins e conectar ao banco de dados. Depois, configurei
   o NestJS, criando o itemsService para encapsular a lógica de busca com Prisma e o controlador para expor a rota. E implementei tratamento de exceções
   (como a filtragem) para garantir robustez no projeto.

## Observações finais

 - Se caso precisar de algum modelo de objeto para usar na criação do objeto, deixarei aqui abaixo um modelo caso precise.
``` bash
{
    "name": "★ Specialist Gloves | Field Agent",
    "price": 197906,
    "float": "0.88",
    "image": "https://cdn.csgoskins.gg/public/uih/products/aHR0cHM6Ly9jb21tdW5pdHkuY2xvdWRmbGFyZS5zdGVhbXN0YXRpYy5jb20vZWNvbm9teS9pbWFnZS8tOWE4MWRsV0x3SjJVVUdjVnNfbnNWdHpkT0VkdFd3S0daWkxRSFR4RFo3STU2S1UwWnd3bzROVVg0b0ZKWkVITGJYSDVBcGVPNFltbGh4WVFrbkNSdkNvMDREQVExaDNMQVZidjZteEZBQnMzT1hOWWdKUl9ObTFuWUdIbnVUZ0RMM1RuMVJkNGNKNW5xZVdwdHZ6aWd5Ml9VdHNOV0h4ZG9mQmNBYzVZRm5SX1ZhOGt1em1nc1c1djVuT21uUm12WFVqLXotRHlJcl9jMWlG/auto/auto/85/notrim/c21d39bf06b9953121651e9727d6780d.webp",
    "category": "luvas"

}
```