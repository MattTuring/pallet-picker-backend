const palettesData = require('../../../data/palettesNw');

const getProjectID = async (knex, palette) => {
  const [ project ] = await knex('projects').where({name: palette.project}).select();
  return project.id
}

const makePalette = async (knex, palette) => {
  const projectID = await getProjectID(knex, palette);
  const { name, color1, color2, color3, color4, color5 } = palette;
  return knex('palettes').insert({ name, color1, color2, color3, color4, color5, project_id: projectID });
}

exports.seed = async (knex) => {
  try {
    await knex('palettes').del();

    let palettesPromises = palettesData.map(palette => makePalette(knex, palette));

    return Promise.all(palettesPromises);
  }
  catch (error) {
    console.log(`Error seeding data: ${error}`);
  }
};
