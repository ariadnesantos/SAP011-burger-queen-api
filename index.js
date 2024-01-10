const express = require('express');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');

const { port, dbUrl, secret } = config;
const app = express();//inicializa o express || const app centraliza as configurações

// TODO: Conexión a la Base de Datos (MongoDB o MySQL)
try {
  mongoose.connect(dbUrl);
  console.log('Conectado ao banco');
  } catch (error) {
  console.log(`Erro: ${error}`);
  }

app.set('config', config);
app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //permite a conexão de dados via json
app.use(authMiddleware(secret)); //senha que vai ser usada pra autenticação

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

//função que inicia a aplicação
  app.listen(port, () => {
    console.info(`App listening on port ${port}`); //Entender o motivo da port estar undefined
    console.log('Servidor Online!')
  });
});
