import Knex from 'knex'
//se a migration der certo executa está function
export async function up(knex: Knex) {
  return knex.schema.createTable('points_item', table => {
    table.integer('point_id')
      .notNullable()
      .references('id')
      .inTable('points');

    table.integer('item_id')
      .notNullable()
      .references('id')
      .inTable('items');
  });
}

//se der erro executa essa function
export async function down(knex: Knex) {
  knex.schema.dropTable('points_item');

}