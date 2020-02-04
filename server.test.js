const request = require('supertest');
const app = require('./server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

describe('Server', () => {
  beforeEach(async () => {
    await database.seed.run();
  });

  describe("Projects", () => {
    describe('GET /api/v1/projects', () => {
      it('should return a 200 and all of the projects', async () => {
        // setup
        const receivedProjects = await database('projects').select();
        const expectedProjects = JSON.parse(JSON.stringify(receivedProjects));

        // execution
        const res = await request(app).get('/api/v1/projects');
        const projects = res.body;

        // expectation
        expect(res.status).toBe(200);
        expect(projects).toEqual(expectedProjects);
      });
    });

    describe('GET /api/v1/projects/:id', () => {
      it('should return a 200 and a single project if the project exists', async () => {
        // setup
        const receivedProject = await database('projects').first();
        const { id } = receivedProject;
        const expectedProject = JSON.parse(JSON.stringify(receivedProject))

        // execution
        const res = await request(app).get(`/api/v1/projects/${id}`);
        const result = res.body;

        // expectation
        expect(res.status).toBe(200);
        expect(result).toEqual(expectedProject);
      });

      it('should return a 404 and the message "Could not find project with id"', async () => {
        const invalidID = -1;

        const response = await request(app).get(`/api/v1/projects/${invalidID}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toEqual(`Could not find project with id ${invalidID}`);
      });
    });

    describe('POST /api/v1/projects', () => {
      it('should post a new project to the db', async () => {
        const newProject = { name: 'New Socks' };

        const res = await request(app).post('/api/v1/projects').send(newProject);
        const projects = await database('projects').where('name', res.body.name);

        const [ project ] = projects;

        expect(res.status).toBe(201);
        expect(project.name).toEqual(newProject.name);
      });

      it('should return a 422 and the message "Expected format: { name: <String> }. You\'re missing a "name" property."', async () => {
        const newProject = { };

        const res = await request(app).post('/api/v1/projects').send(newProject);

        expect(res.status).toBe(422);
        expect(res.body.error).toEqual('Expected format: { name: <String> }. You\'re missing a "name" property.');
      });
    });

    describe('PUT /api/v1/projects/:id', () => {
      it('should update a project in the db', async () => {
        const expectedProject = await database('projects').first();
        const { id } = expectedProject;
        const updatedProject = { name: 'Logo for app' };

        const res = await request(app).put(`/api/v1/projects/${id}`).send(updatedProject);
        const project = res.body;

        expect(res.status).toBe(202)
        expect(project.name).toEqual(updatedProject.name)
      });

      it('should return a 422 and the message "Expected format: { name: <String> }. You\'re missing a "name" property." if there is no data', async () => {
        const { id } = await database('projects').first();

        const updatedProject = { };

        const res = await request(app).put('/api/v1/projects/${id}').send(updatedProject);

        expect(res.status).toBe(422);
        expect(res.body.error).toEqual('Expected format: { name: <String> }. You\'re missing a "name" property.');
      });
    });

    describe('DELETE /api/v1/projects/:id', () => {
      it('should return a 203 and the message with result "Project was deleted!"', async () => {
        const deletedProject = await database('projects').first();
        const { id } = deletedProject;
        const expectedResult = 'Project was deleted!';

        const res = await request(app).delete(`/api/v1/projects/${id}`);

        expect(res.status).toBe(203)
        expect(res.body.result).toEqual(expectedResult)
      });
    });
  });

  describe("Palettes", () => {
    describe('GET /api/v1/palettes', () => {
      it('should return a 200 and all of the palettes', async () => {
        // setup
        const receivedPalettes = await database('palettes').select();
        const expectedPalettes = JSON.parse(JSON.stringify(receivedPalettes));
        // execution
        const res = await request(app).get('/api/v1/palettes');
        const palettes = res.body;

        // expectation
        expect(res.status).toBe(200);
        expect(palettes).toEqual(expectedPalettes);
      });
    });

    describe('GET /api/v1/palettes/:id', () => {
      it('should return a 200 and a single palette if the palette exists', async () => {
        // setup
        const receivedPalette = await database('palettes').first();
        const { id } = receivedPalette;
        const expectedPalette = JSON.parse(JSON.stringify(receivedPalette))

        // execution
        const res = await request(app).get(`/api/v1/palettes/${id}`);
        const result = res.body;

        // expectation
        expect(res.status).toBe(200);
        expect(result).toEqual(expectedPalette);
      });

      it('should return a 404 and the message "Could not find palette with id"', async () => {
        const invalidID = -1;

        const response = await request(app).get(`/api/v1/palettes/${invalidID}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toEqual(`Could not find palette with id ${invalidID}`);
      });
    });

    describe('POST /api/v1/palettes', () => {
      it('should post a new palette to the db', async () => {
        const { id } = await database('projects').first();

        const newPalette = {
          name: 'Banana',
          color1: '#D2B122',
          color2: '#7EA93E',
          color3: '#2F9760',
          color4: '#005246',
          color5: '#8F7D4B',
          project_id: id
        };

        const res = await request(app).post('/api/v1/palettes').send(newPalette);
        const palettes = await database('palettes').where('name', res.body.name);

        const [ palette ] = palettes;

        expect(res.status).toBe(201);
        expect(palette.name).toEqual(newPalette.name);
      });

      it('should return a 422 and the message "Expected format: { name: <String>, color1: <String>, color2: <String>, color3: <String>, color4: <String>, color5: <String>, peoject_id: <Number> }. You\'re missing a "color1" property."', async () => {
        const newPalette = {
          name: 'Banana'
        };

        const res = await request(app).post('/api/v1/palettes').send(newPalette);

        expect(res.status).toBe(422);
        expect(res.body.error).toEqual('Expected format: { name: <String>, color1: <String>, color2: <String>, color3: <String>, color4: <String>, color5: <String>, peoject_id: <Number> }. You\'re missing a "color1" property.');
      });
    });

    describe('PUT /api/v1/palettes/:id', () => {
      it('should update a palette in the db', async () => {
        const { id } = await database('palettes').first();

        const updatedPalette = {
          name: 'Banana colors'
        };

        const res = await request(app).put(`/api/v1/palettes/${id}`).send(updatedPalette);
        const palette = res.body;

        expect(res.status).toBe(202)
        expect(palette.name).toEqual(updatedPalette.name)
      });

      it('should return a 422 and the message "Expected format: { key: <Value> }. You\'ve not added any data to change." if there is no data', async () => {
        const { id } = await database('palettes').first();

        const updatedPalette = { };

        const res = await request(app).put('/api/v1/palettes/${id}').send(updatedPalette);

        expect(res.status).toBe(422);
        expect(res.body.error).toEqual('Expected format: { key: <Value> }. You\'ve not added any data to change.');
      });
    });

    describe('DELETE /api/v1/palettes/:id', () => {
      it('should return a 203 and the message with result "Palette was deleted!"', async () => {
        const deletedPalette = await database('palettes').first();
        const { id } = deletedPalette;
        const expectedResult = 'Palette was deleted!';

        const res = await request(app).delete(`/api/v1/palettes/${id}`);

        expect(res.status).toBe(203)
        expect(res.body.result).toEqual(expectedResult)
      });
    });
  });
});
