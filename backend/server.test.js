const request = require('supertest');
const app = require('./server');

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);

afterAll(async () => {
  await knex.destroy();
});

describe('GET /ingredients', () => {
  it('deve retornar status 200 e uma lista de ingredientes', async () => {
    const response = await request(app)
      .get('/ingredients')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });
});