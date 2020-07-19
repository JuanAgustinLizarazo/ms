const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const exphbs = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;
const DataStructures = require('./db/dataStructures');
const dataStructuresRouter = require('./routers/dataStructures');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const indexRouter = require('./routers/index');
let client;


/**
 * * Creacion de aplicacion express
 */

const app = express();
/**
 * *Configuracion del motor de plantillas
 */
const hbs = exphbs.create({
  extname: 'hbs',
  layoutsDir: path.join(__dirname,'views'),
  partialsDir: path.join(__dirname,'views/partials')
})
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.engine('hbs',hbs.engine);

/**
 * * Configuracion de las variables de ambiente
 */
const dotenv = require('dotenv');
dotenv.config({
  path: path.join(__dirname,'server.env')
})

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

/**
 * * Inject the client connection to the database
 */
(async function(){
  try{
  client = await MongoClient(URI,{useUnifiedTopology:true}).connect();
  await DataStructures.injectDB( client );
  } catch(e){
    console.error(e);
  }

})();

app.use(session({
  store: new MongoStore({
    url: URI,
    dbName: 'sessions'
  })
}));

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * *Routers
 */
app.use('/javascript',dataStructuresRouter);
app.use('/',indexRouter);


app.listen(PORT);