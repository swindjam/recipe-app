import express from 'express';
import bodyParser from 'body-parser';
import {createLogger, format, transports} from 'winston';
import index from './routes/index';
import searchRecipes from './routes/searchRecipes';
import addRecipe from './routes/addRecipe';
import updateRecipe from './routes/updateRecipe';
import deleteRecipe from './routes/deleteRecipe';
import MongoDataSource from './datasources/Mongo';

const app = express()
const port = 8081

app.use(bodyParser.json({ limit: '10mb' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Setup routes
const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [new transports.Console()]
});
const dataSource = new MongoDataSource(logger);

app.get('/', index(dataSource));
app.get('/search', searchRecipes(dataSource));
app.post('/add', addRecipe(dataSource));
app.post('/update', updateRecipe(dataSource));
app.post('/delete', deleteRecipe(dataSource));

app.listen(port, () => {
    logger.log(`App listening on port ${port}`, {});
});

const shutdown = (exitCode: number) : void => {
   logger.log('Server shutting down', {});
   dataSource.disconnectFromDB();
   process.exit(exitCode + 128);
};

process.on('SIGINT', () => shutdown(2));
process.on('SIGABRT', () => shutdown(6));
process.on('SIGTERM', () => shutdown(15));