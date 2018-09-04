const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src'));


app.set('port', process.env.PORT || 3000);
app.locals.title = 'Bucket List';

app.get('/api/v1/list_items', (request, response) => {
  database('list_items').select()
  .then((list_items) => {
    response.status(200).json(list_items)
  }).catch((error) => {
    response.status(500).json( {error} )
  })
})

app.post('/api/v1/list_items', (request, response) => {
  const idea = request.body;

  for (let requiredParameter of ['title', 'description']) {
    if(!idea[requiredParameter]) {
      return response.status(422).send({error: `Expected format: {title: <STRING>, description: <STRING>}. You are missing a "${requiredParameter} property"`})
    }
  }
  database('list_items').insert(idea, 'id')
    .then(list_item => {
      response.status(201).json({id: list_item[0]})
    })
    .catch(error => {
      response.status(500).json( {error} )
    });
});

app.delete('/api/v1/list_items/:id', (request, response) => {
  database('list_items').where('id', request.params.id).del()
  .then(list_item => {
    if (list_item.length) {
      response.status(404).json({error: `Could not find a list item with id ${request.params.id}`})
    } else {
      response.status(200).json(list_item)
    }
  })
})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;