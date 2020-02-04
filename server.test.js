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
  });
});
