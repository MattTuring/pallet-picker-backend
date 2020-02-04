const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3001);

app.get('/api/v1/projects', async (request, response) => {
  try {
    const projects = await database('projects').select();
    response.status(200).json(projects);
  }
  catch(error) {
    response.status(500).json({ error });
  }
});

app.get('/api/v1/projects/:id', async (request, response) => {
  try {
    const projects = await database('projects').where('id', request.params.id).select();
    const [ project ] = projects;
    if (!projects.length) {
      return response.status(404).json({
        error: `Could not find project with id ${request.params.id}`
      });
    }
    return response.status(200).json(project);
  }
  catch(error) {
    response.status(500).json({ error });
  }
});

app.listen(app.get('port'), () => {
  console.log('running');
});
