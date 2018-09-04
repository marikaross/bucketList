exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('list_items').del()
    .then(() => knex('task_genres').del())
    .then(function () {
      return Promise.all([
        knex('task_genres').insert({
          genre: 'Travel'
        }, 'id')
          .then(task_genre => {
            return knex('list_items').insert([
              {title: 'Australia', description: 'Go see a platypus in person', genre_id: task_genre[0]},
              {title: 'New Zealand', description: 'Go to Hobbiton', genre_id: task_genre[0]}

              ])
          })
          .then(() =>  console.log('All seeded!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
        ])
      })
    .catch(error => console.log(`Error seeding data: ${error}`));
  };