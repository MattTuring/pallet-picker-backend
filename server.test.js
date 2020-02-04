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
  });
});
