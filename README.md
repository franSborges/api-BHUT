# Passos para rodar a api REST


#### Para rodar o projeto e testar, os comandos abaixo deverão ser seguidos!!!.


### Para baixar as dependências e os pacotes do projeto.

```bash
  npm install
```

### Para rodar o servidor.

```bash
  npm run dev
```

### Para rodar o webhook.

```bash
  npm run webhook
```
##### O webhook vai rodar a notificação no terminal assim que criar o registro do carro no banco.


### Rotas


```
GET api/listCars - Retorna uma lista dos registros dos carros cadastrados;
```
```
POST api/createCar - Cria um novo registro do carro na base de dados;
```
```
GET api/logs - Retorna uma lista de registros dos logs de cada carro cadastrado na base de dados;
```


