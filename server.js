const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())


const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('running');
})
