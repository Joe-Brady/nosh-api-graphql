exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert([
        {
          name: "Apple",
          description: "Granny smith",
          price: 1.2,
          category: "fruit",
          quantity: 35
        },
        {
          name: "Orange",
          description: "Spanish",
          price: 1.5,
          category: "fruit",
          quantity: 12
        }
      ]);
    });
};
