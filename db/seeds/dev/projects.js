const projectsData = require('../../../data/projects');
const palletsData = require('../../../data/pallets');


exports.seed = async (knex) => {
  try {
    await knex('projects').del();
    await knex('pallets').del();

    let projectsPromises = projectsData.map(project => {
      return knex('projects').insert(project);
    });

    let palletsPromises = palletsData.map(pallet => {
      return knex('pallets').insert(pallet);
    });

    let all = [...projectsPromises, ...palletsPromises]
    return Promise.all(all);
  }
  catch (error) {
    console.log(`Error seeding data: ${error}`);
  }
};
