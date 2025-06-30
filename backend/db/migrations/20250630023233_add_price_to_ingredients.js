exports.up = function(knex) {
  return knex.schema.table('ingredients', function(table) {
    table.decimal('price', 8, 2).notNullable().defaultTo(0.00);
  });
};

exports.down = function(knex) {
  return knex.schema.table('ingredients', function(table) {
    table.dropColumn('price');
  });
};