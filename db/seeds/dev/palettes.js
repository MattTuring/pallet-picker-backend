const palettesData = require('../../../data/palettes');

exports.seed = async (knex) => {
  try {
    await knex('palettes').del();
    await knex('palettes').insert(palettesData);
  }
  catch (error) {
    console.log(`Error seeding data: ${error}`);
  }
};
