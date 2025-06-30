const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile').development);
const apiKeyAuth = require('./authMiddleware');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use(apiKeyAuth);

app.get('/ingredients', async (req, res) => {
  try {
    const ingredients = await knex('ingredients').select('*');
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ingredientes.' });
  }
});

app.post('/order', async (req, res) => {
  const { name, baseIngredients } = req.body;
  if (!name || !baseIngredients || !Array.isArray(baseIngredients) || baseIngredients.length === 0) {
    return res.status(400).json({ error: 'Pedido inválido. Nome e ingredientes base são obrigatórios.' });
  }
  res.status(201).json({ message: `Pedido para '${name}' recebido com sucesso!` });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Servidor backend rodando em http://localhost:${port}`);
  });
}

module.exports = app;