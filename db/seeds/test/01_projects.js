const projectsData = require('../../../data/projects');

exports.seed = async (knex) => {
  try {
    await knex('pallets').del();
    await knex('projects').del();
    await knex('projects').insert(projectsData);
  }
  catch (error) {
    console.log(`Error seeding data: ${error}`);
  }
};
