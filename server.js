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

app.post('/api/v1/projects', async (request, response) => {
  const project = request.body;

  if (!project.name) {
    return response
      .status(422)
      .send({ error: `Expected format: { name: <String> }. You're missing a "name" property.` });
  }

  try {
    const id = await database('projects').insert(project, 'id');
    response.status(201).json(project)
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.put('/api/v1/projects/:id', async (request, response) => {
  const project = request.body;

  if (!project.name) {
    return response
      .status(422)
      .send({ error: `Expected format: { name: <String> }. You're missing a "name" property.` });
  }

  try {
    const id = await database('projects').where('id', request.params.id).update(project);
    response.status(202).json({result: 'Project was updated!'})
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.listen(app.get('port'), () => {
  console.log('running');
});
