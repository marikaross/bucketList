exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('list_items').del()
    .then(function () {
      return Promise.all([
        knex('list_items').insert([{title: 'Australia', description: 'Go see a platypus in person'},
        {title: 'New Zealand', description: 'Go to Hobbiton'}],'id')
          .then(() =>  console.log('All seeded!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
        ])
      })
    .catch(error => console.log(`Error seeding data: ${error}`));
  };