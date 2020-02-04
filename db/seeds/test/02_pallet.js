const palletsData = require('../../../data/palletsNw');

const getProjectID = async (knex, pallet) => {
  const [ project ] = await knex('projects').where({name: pallet.project}).select();
  return project.id
}

const makePallet = async (knex, pallet) => {
  const projectID = await getProjectID(knex, pallet);
  const { name, color1, color2, color3, color4, color5 } = pallet;
  return knex('pallets').insert({ name, color1, color2, color3, color4, color5, project_id: projectID });
}

exports.seed = async (knex) => {
  try {
    await knex('pallets').del();

    let palletsPromises = palletsData.map(pallet => makePallet(knex, pallet));

    return Promise.all(palletsPromises);
  }
  catch (error) {
    console.log(`Error seeding data: ${error}`);
  }
};
