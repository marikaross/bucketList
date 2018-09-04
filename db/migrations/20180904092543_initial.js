
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('task-genres', function(table) {
      table.increments('id').primary();
      table.string('genre');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('list-items', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.integer('genre_id').unsigned()
      table.foreign('genre_id').references('task-genres.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('list-items'),
    knex.schema.dropTable('task-genres')
  ]);
};
