const request = require('supertest');
const app = require('../server');

// --- Teste de API (Caixa-Preta) ---
describe('API Endpoint: /ingredients', () => {
  it('[API-01] Deve retornar status 200 e uma lista de ingredientes', async () => {
    const response = await request(app).get('/ingredients');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('type');
  });
});

// --- Teste Unitário (Caixa-Branca) ---
const getCoffeeName = (baseIngredients) => {
    if (!baseIngredients || baseIngredients.length === 0) return '';
    const key = [...baseIngredients].sort().join(',');
    const coffeeNameMap = {
      'Espresso': 'Espresso Tradicional', 'Espresso,Leite': 'Latte',
      'Espresso,Espuma': 'Espresso Macchiato', 'Espresso,Espuma,Leite': 'Cappuccino Clássico',
      'Chocolate,Espresso,Leite': 'Mocha', 'Chocolate,Espresso,Espuma': 'Vienense (variação)',
      'Espresso,Sorvete': 'Affogato',
    };
    return coffeeNameMap[key] || 'Café Personalizado';
};

describe('Regra de Negócio - Identificação de Café', () => {
    test('[UNIT-01] Deve identificar corretamente "Cappuccino Clássico"', () => {
        const ingredients = ['Leite', 'Espuma', 'Espresso'];
        expect(getCoffeeName(ingredients)).toBe('Cappuccino Clássico');
    });

    test('[UNIT-02] Deve retornar "Café Personalizado" para combinações não clássicas', () => {
        const ingredients = ['Leite', 'Chocolate'];
        expect(getCoffeeName(ingredients)).toBe('Café Personalizado');
    });
});