const projectsData = require('../../../data/projects');

exports.seed = async (knex) => {
  try {
    await knex('palettes').del();
    await knex('projects').del();
    await knex('projects').insert(projectsData);
  }
  catch (error) {
    console.log(`Error seeding data: ${error}`);
  }
};
