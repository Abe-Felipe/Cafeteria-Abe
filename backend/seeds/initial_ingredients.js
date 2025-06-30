// backend/db/seeds/initial_ingredients.js
exports.seed = async function(knex) {
  await knex('ingredients').del();
  await knex('ingredients').insert([
    // Bases (preços em R$)
    { name: 'Espresso', type: 'base', price: 5.00 },
    { name: 'Leite', type: 'base', price: 2.00 },
    { name: 'Espuma', type: 'base', price: 1.00 },
    { name: 'Chocolate', type: 'base', price: 3.50 },
    { name: 'Sorvete', type: 'base', price: 6.00 },
    // Extras
    { name: 'Caramelo', type: 'extra', price: 2.50 },
    { name: 'Calda de Chocolate', type: 'extra', price: 2.50 },
    { name: 'Chantilly', type: 'extra', price: 3.00 },
    { name: 'Canela', type: 'extra', price: 1.50 },
  ]);
};