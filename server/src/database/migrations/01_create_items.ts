import Knex from 'knex'

//se a migration der certo executa está function
export async function up(knex: Knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  })
}

//se der erro executa essa function
export async function down(knex: Knex) {
  return knex.schema.dropTable('items');
}