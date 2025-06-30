const request = require('supertest');
const app = require('../server');

describe('API Error Handling', () => {
  it('[API-02] Deve retornar 404 para uma rota inexistente', async () => {
    const response = await request(app).get('/rota-que-nao-existe');
    expect(response.statusCode).toBe(404);
  });

  it('[API-03] Deve retornar 400 ao tentar criar um pedido sem os dados necessários', async () => {
    const malformedOrder = { name: 'Café Teste' }; // Faltando baseIngredients
    const response = await request(app)
      .post('/order')
      .send(malformedOrder);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Pedido inválido. Nome e ingredientes base são obrigatórios.');
  });
});