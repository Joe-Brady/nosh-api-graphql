exports.up = function(knex) {
  return knex.schema.table("products", function(table) {
    table
      .integer("quantity")
      .notNull()
      .defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.table("products", function(table) {
    table.dropColumn("quantity");
  });
};
