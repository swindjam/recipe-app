import express from 'express';
import bodyParser from 'body-parser';
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
const dataSource = new MongoDataSource();

app.get('/', index(dataSource));
app.get('/search', searchRecipes(dataSource));
app.post('/add', addRecipe(dataSource));
app.post('/update', updateRecipe(dataSource));
app.post('/delete', deleteRecipe(dataSource));

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});