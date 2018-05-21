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

// app.get('/', (request, response) => {
//   response.send('Oh yeah it\'s on!');
// });

app.get('/api/v1/photos', (request, response) => {
  database('photos').select()
  .then(photo => {
    response.status(200).json
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;