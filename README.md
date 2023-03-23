# Bem-vindo ao repositório Car Shop

## Descrição do projeto:

O Car Shop é uma API para gerenciar uma concessionária de veículos.

Nesse projeto, foram aplicados os princípios de POO para a construção de uma API Rest para gerenciar uma concessionária e veículos utilizando o banco de dados MongoDB através do ODM Mongoose.

<details>
  <summary><strong>:busts_in_silhouette: Na aplicação o usuário é capaz de: </strong></summary><br />


  - Cadastrar um novo carro
  - Listar todos os carros
  - Listar um carro pelo seu ID
  - Atualizar um carro existente
  - Deletar um carro existente

  - Cadastrar uma nova moto
  - Listar todas as motos
  - Listar uma moto pelo seu ID
  - Atualizar uma moto existente
  - Deletar uma moto existente

</details>

<details>
  <summary><strong> :hammer_and_wrench: Habilidades utilizadas no desenvolvimento</strong></summary><br />

- Práticas da arquitetura MSC
- Modelagem de dados com MongoDB através do ODM Mongoose;
- Construção de uma API REST com TypeScript e NodeJs;
- Práticas dos conhecimentos sobre os princípios SOLID;
- Práticas dos pilares de POO (Programação Orientada a Objetos): Herança, Abstração, Encapsulamento e Polimorfismo;
- Exercitar a Abstração para gerar projetos escaláveis e menos verbosos;
- Manuseio de containers com Docker;
- Práticas de utilização do framework Express;
- Teste unitários utilizando Chai e Sinon;

</details>

<details>
  <summary><strong>:pencil: Stacks praticadas durante o desenvolvimento</strong></summary><br />
  
- Node.js
- TypeScript
- Express.js
- Docker
- MongoDB
- Mongoose ODM
- Sinon stubs
- Chai testing library

</details>

 ##  Funcionamento
  
 <details>
  <summary><strong>:whale: Execução da aplicação </strong></summary><br />
  
  - Para iniciar o projeto basta ter o docker instalado e rodar o comando ```docker-compose up -d``` na pasta raiz do repositório.
  - Para finalizar o projeto rode o comando `docker-compose down` na pasta raiz do repositório.
  - Para visualizar os logs do backend no terminal, rode o comando `docker-compose run logs app-car-shop` na pasta raiz do repositório.
  - A aplicação roda na porta ` 3001 `
  - Exemplo de rota final: `http://localhost:3001/cars`

  </details>

 <details>
  <summary><strong>:twisted_rightwards_arrows: Rotas </strong></summary><br />
  
  <details>
    <summary><strong> POST /cars </strong></summary><br />
  
  - Para realizar o cadastro de um novo carro, utilize o método `POST` em `/cars`, o body da requisição deve conter o seguinte formato:

    ```json
    {
      "model": "Marea",
      "year": 2002,
      "color": "Black",
      "status": true,
      "buyValue": 15.990,
      "doorsQty": 4,
      "seatsQty": 5
    }
    ```
  - O retorno será um status `200` e um `json` contendo o veículo cadastrado:
        
    ```json
    {
      "id": "6348513f34c397abcad040b2",
      "model": "Marea",
      "year": 2002,
      "color": "Black",
      "status": true,
      "buyValue": 15.990,
      "doorsQty": 4,
      "seatsQty": 5
    }
    ```
  
  </details>

  <details>
    <summary><strong> POST /motorcycles </strong></summary><br />
  
  - Para realizar o cadastro de uma nova moto, utilize o método `POST` em `/motorcycles`, o body da requisição deve conter o seguinte formato:

    ```json
    {
      "model": "Honda Cb 600f Hornet",
      "year": 2005,
      "color": "Yellow",
      "status": true,
      "buyValue": 30.000,
      "category": "Street",
      "engineCapacity": 600
    }
    ```
  
  - O retorno será um status `200` e um `json` contendo o veículo cadastrado:
        
    ```json
    {
      "id": "6348513f34c397abcad040b2",
      "model": "Honda Cb 600f Hornet",
      "year": 2005,
      "color": "Yellow",
      "status": true,
      "buyValue": 30.000,
      "category": "Street",
      "engineCapacity": 600
    }
    ```
  
  </details>

  <details>
  <summary><strong> GET /cars </strong></summary><br />

  - Utilizando o método GET em `/cars`, o retorno será um status `200` e um `json` contendo os carros cadastrados:
        
    ```json
    [
      {
        "id": "634852326b35b59438fbea2f",
        "model": "Marea",
        "year": 2002,
        "color": "Black",
        "status": true,
        "buyValue": 15.99,
        "doorsQty": 4,
        "seatsQty": 5
      },
      {
        "id": "634852326b35b59438fbea31",
        "model": "Tempra",
        "year": 1995,
        "color": "Black",
        "buyValue": 39,
        "doorsQty": 2,
        "seatsQty": 5
      }
    ]
    ```

  </details>
  
  <details>
  <summary><strong> GET /motorcycles </strong></summary><br />
  
  - Utilizando o método GET em `/motorcycles`, o retorno será um status `200` e um `json` contendo uma lista de todas as motos cadastradas:
        
    ```json
    [
      {
        "id": "634852326b35b59438fbea2f",
        "model": "Honda Cb 600f Hornet",
        "year": 2005,
        "color": "Yellow",
        "status": true,
        "buyValue": 30.000,
        "category": "Street",
        "engineCapacity": 600
      },
      {
        "id": "634852326b35b59438fbea31",
        "model": "Honda Cbr 1000rr",
        "year": 2011,
        "color": "Orange",
        "status": true,
        "buyValue": 59.900,
        "category": "Street",
        "engineCapacity": 1000
      }
    ]
    ```
  
  </details>

  <details>
  <summary><strong> GET /cars/:id </strong></summary><br />
  
  - Utilizando o método GET em `/cars/:id` é possível buscar um carro específico, basta enviar por parâmetro o ` id ` do veículo.
  - O ` id ` deve ser um valor válido de um veículo existente no banco de dados e seguir os padrões de id do MongoDB, como no exemplo abaixo:

    ```json
      http://localhost:3001/cars/6348513f34c397abcad040b2
    ```

  - O retorno será um status `200` e um `json` contendo o veículo com o id informado:
        
    ```json
    {
      "id": "6348513f34c397abcad040b2",
      "model": "Marea",
      "year": 2002,
      "color": "Black",
      "status": true,
      "buyValue": 15.990,
      "doorsQty": 4,
      "seatsQty": 5
    }
    ```
  - Caso o veículo não seja encontrado, será retornado o status ` 404 ` e um `json` contendo uma mensagem:
        
    ```json
    { "message": "Car not found" }
    ```
  - Caso um ` id ` inválido seja informado, será retornado o status ` 422 ` e um `json` contendo uma mensagem:
        
    ```json
    { "message": "Invalid mongo id" }
    ```

  </details>

  <details>
  <summary><strong> GET /motorcycles/:id </strong></summary><br />
  
  - Utilizando o método GET em `/motorcycles/:id` é possível buscar uma moto específica, basta enviar por parâmetro o ` id ` do veículo.
  - O ` id ` deve ser um valor válido de um veículo existente no banco de dados e seguir os padrões de id do MongoDB, como no exemplo abaixo:

    ```json
      http://localhost:3001/motorcycles/634852326b35b59438fbea2f
    ```

  - O retorno será um status `200` e um `json` contendo o veículo com o id informado:
        
    ```json
    {
      "id": "634852326b35b59438fbea2f",
      "model": "Honda Cb 600f Hornet",
      "year": 2005,
      "color": "Yellow",
      "status": true,
      "buyValue": 30.000,
      "category": "Street",
      "engineCapacity": 600
    }
    ```
  - Caso o veículo não seja encontrado, será retornado o status ` 404 ` e um `json` contendo uma mensagem:
        
    ```json
      { "message": "Motorcycle not found" }
    ```
  - Caso um ` id ` inválido seja informado, será retornado o status ` 422 ` e um `json` contendo uma mensagem:
  
    ```json
      { "message": "Invalid mongo id" }
    ```
  </details>

  <details>
  <summary><strong> PUT /cars/:id </strong></summary><br />
  
  - Utilizando o método PUT em `/cars/:id` é possível atualizar um carro específico, basta enviar por parâmetro o ` id ` do veículo e o ` body ` da requisição deve conter o seguinte formato:

    ```json
    {
      "model": "Marea",
      "year": 1992,
      "color": "Red",
      "status": true,
      "buyValue": 12.000,
      "doorsQty": 2,
      "seatsQty": 5
    }
    ```

  - O ` id ` deve ser um valor válido de um veículo existente no banco de dados e seguir os padrões de id do MongoDB, como no exemplo abaixo:

    ```json
      http://localhost:3001/cars/634852326b35b59438fbea2f
    ```

  - O retorno será um status `200` e um `json` contendo o veículo com o id informado:
        
    ```json
    {
      "id": "634852326b35b59438fbea2f",
      "model": "Marea",
      "year": 1992,
      "color": "Red",
      "status": true,
      "buyValue": 12.000,
      "doorsQty": 2,
      "seatsQty": 5
    }
    ```
  - Caso o veículo não seja encontrado, será retornado o status ` 404 ` e um `json` contendo uma mensagem:

    ```json
    { "message": "Car not found" }
    ```
  - Caso um ` id ` inválido seja informado, será retornado o status ` 422 ` e um `json` contendo uma mensagem:

    ```json
    { "message": "Invalid mongo id" }
    ```
  </details>

  <details>
  <summary><strong> PUT /motorcycles/:id </strong></summary><br />
  
  - Utilizando o método PUT em `/motorcycles/:id` é possível atualizar uma moto específica, basta enviar por parâmetro o ` id ` do veículo e o ` body ` da requisição deve conter o seguinte formato:

    ```json
    {
      "model": "Honda Cb 600f Hornet",
      "year": 2014,
      "color": "Red",
      "status": true,
      "buyValue": 45.000,
      "category": "Street",
      "engineCapacity": 600
    }
    ```

  - O ` id ` deve ser um valor válido de um veículo existente no banco de dados e seguir os padrões de id do MongoDB, como no exemplo abaixo:

    ```json
      http://localhost:3001/motorcycles/634852326b35b59438fbea2f
    ```

  - O retorno será um status `200` e um `json` contendo o veículo com o id informado:
        
    ```json
    {
      "id": "634852326b35b59438fbea2f",
      "model": "Honda Cb 600f Hornet",
      "year": 2014,
      "color": "Red",
      "status": true,
      "buyValue": 45.000,
      "category": "Street",
      "engineCapacity": 600
    }
    ```
  - Caso o veículo não seja encontrado, será retornado o status ` 404 ` e um `json` contendo uma mensagem:

    ```json
    { "message": "Motorcycle not found" }
    ```
  - Caso um ` id ` inválido seja informado, será retornado o status ` 422 ` e um `json` contendo uma mensagem:

    ```json
    { "message": "Invalid mongo id" }
    ```
  </details>

  <details>
  <summary><strong> DELETE /cars/:id </strong></summary><br />
  
  - Utilizando o método DELETE em `/cars/:id` é possível deletar um carro do banco de dados, basta enviar por parâmetro o ` id ` do veículo:
  - O ` id ` deve ser um valor válido de um veículo existente no banco de dados e seguir os padrões de id do MongoDB, como no exemplo abaixo:

    ```json
      http://localhost:3001/cars/634852326b35b59438fbea2f
    ```

  - O retorno será um status ` 204 ` sem ` body `:

  - Caso o veículo não seja encontrado, será retornado o status ` 404 ` e um `json` contendo uma mensagem:

    ```json
    { "message": "Car not found" }
    ```
  - Caso um ` id ` inválido seja informado, será retornado o status ` 422 ` e um `json` contendo uma mensagem:

    ```json
    { "message": "Invalid mongo id" }
    ```
  </details>

  <details>
  <summary><strong> DELETE /motorcycles/:id </strong></summary><br />
  
  - Utilizando o método DELETE em `/motorcycles/:id` é possível deletar uma moto do banco de dados, basta enviar por parâmetro o ` id ` do veículo:
  - O ` id ` deve ser um valor válido de um veículo existente no banco de dados e seguir os padrões de id do MongoDB, como no exemplo abaixo:

    ```json
      http://localhost:3001/motorcycles/634852326b35b59438fbea2f
    ```

  - O retorno será um status ` 204 ` sem ` body `:

  - Caso o veículo não seja encontrado, será retornado o status ` 404 ` e um `json` contendo uma mensagem:

    ```json
    { "message": "Motorcycle not found" }
    ```
  - Caso um ` id ` inválido seja informado, será retornado o status ` 422 ` e um `json` contendo uma mensagem:

    ```json
    { "message": "Invalid mongo id" }
    ```
  </details>
  
</details>