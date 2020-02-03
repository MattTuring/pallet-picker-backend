const projectsData = require('../../../data/projects');

exports.seed = async (knex) => {
  try {
    await knex('projects').del();

    let projectsPromises = projectsData.map(project => {
      return knex('projects').insert(project);
    });

    return Promise.all(projectsPromises);
  }
  catch (error) {
    console.log(`Error seeding data: ${error}`);
  }
};
