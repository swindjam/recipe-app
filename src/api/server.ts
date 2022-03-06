import express from 'express';
import bodyParser from 'body-parser';
import index from './routes/index';
import searchRecipes from './routes/searchRecipes';
import saveRecipe from './routes/saveRecipe';
import deleteRecipe from './routes/deleteRecipe';

const app = express()
const port = 8081

app.use(bodyParser.json({ limit: '10mb' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Setup routes
app.get('/', index);
app.get('/search', searchRecipes);
app.post('/save', saveRecipe);
app.post('/delete', deleteRecipe);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});