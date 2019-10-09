exports.up = function(knex) {
  return knex.schema.createTable("products", function(table) {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.string("name").notNull();
    table.text("description").nullable();
    table.decimal("price", 6, 2).notNull();
    table.enum("category", ["fruit", "veg", "clothes"]).notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("products");
};
