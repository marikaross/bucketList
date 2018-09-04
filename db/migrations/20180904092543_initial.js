
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('task_genres', function(table) {
      table.increments('id').primary();
      table.string('genre');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('list_items', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.integer('genre_id').unsigned()
      table.foreign('genre_id').references('task_genres.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('list_items'),
    knex.schema.dropTable('task_genres')
  ]);
};
