const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.set('port', process.env.PORT || 3000);
app.locals.title = 'Photo Tracker Keeper';

app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/api/v1/photos', (request, response) => {
  database('photos').select()
  .then(photo => {
    response.status(200).json(photo);
  })
  .catch(error => {
    response.status(404).json(error);
  });
});

app.post('/api/v1/photos', (request, response) => {
  const photo = request.body;

  if(!photo.name || !photo.url) {
    return response.status(422).send({ error: 'Missing data'})
  } else {
    database('photos').insert(photo, 'id')
    .then(photo => {
      response.status(201).json({ id: photo[0] })
    })
    .catch(error => {
      response.status(500).json(error);
    });
  };
});

app.delete('/api/v1/photos/:id', (request, response) => {
  const { id } = request.params;

  database('photos').where('id', id).delete()
  .then(photo => {
    if (photo) {
      response.status(200).json(`${photo} deleted!`);
    } else {
      response.status(404).json(photo);
    }
  })
  .catch(error => {
    response.status(500).json(error);
  });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;