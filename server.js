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

app.get('/api/v1/palettes', async (request, response) => {
  try {
    const palettes = await database('palettes').select();
    response.status(200).json(palettes);
  }
  catch(error) {
    response.status(500).json({ error });
  }
});

app.get('/api/v1/palettes/:id', async (request, response) => {
  try {
    const palettes = await database('palettes').where('id', request.params.id).select();
    const [ palette ] = palettes;
    if (!palettes.length) {
      return response.status(404).json({
        error: `Could not find palette with id ${request.params.id}`
      });
    }
    return response.status(200).json(palette);
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

app.post('/api/v1/palettes', async (request, response) => {
  const palette = request.body;

  for (let requiredParameter of ['name', 'color1', 'color2', 'color3', 'color4', 'color5', 'project_id']) {
      if (!palette[requiredParameter]) {
        return response
          .status(422)
          .send({ error: `Expected format: { name: <String>, color1: <String>, color2: <String>, color3: <String>, color4: <String>, color5: <String>, peoject_id: <Number> }. You\'re missing a "${requiredParameter}" property.` });
      }
    }

  try {
    const id = await database('palettes').insert(palette, 'id');
    response.status(201).json(palette)
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.put('/api/v1/projects/:id', async (request, response) => {
  const project = request.body;

  if (!project.name) {
    return response
      .status(422)
      .send({ error: 'Expected format: { name: <String> }. You\'re missing a "name" property.' });
  }

  try {
    const [ id ]  = await database('projects').where('id', request.params.id).update(project, 'id');
    const [ updatedProject ]  = await database('projects').where('id', id).select();
    response.status(202).json(updatedProject);
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.put('/api/v1/palettes/:id', async (request, response) => {
  const palette = request.body;

  if (!Object.keys(palette).length) {
    return response
      .status(422)
      .send({ error: `Expected format: { key: <Value> }. You've not added any data to change.`});
  }

  try {
    const [ id ]  = await database('palettes').where('id', request.params.id).update(palette, 'id');
    const [ updatedPalette ]  = await database('palettes').where('id', id).select();
    response.status(202).json(updatedPalette);
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.delete('/api/v1/projects/:id', async (request, response) => {
  try {
    await database('palettes').where('project_id', request.params.id).del();
    await database('projects').where('id', request.params.id).del();
    response.status(203).json({result: 'Project was deleted!'});
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.delete('/api/v1/palettes/:id', async (request, response) => {
  try {
    await database('palettes').where('id', request.params.id).del();
    response.status(203).json({result: 'Palette was deleted!'});
  } catch (error) {
    response.status(500).json({ error });
  }
});
app.listen(app.get('port'), () => {
  console.log('running');
});

module.exports = app;
