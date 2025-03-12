/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("attractions", (table) => {
    table.increments("id").unsigned().primary();
    table.string("location").notNullable().defaultTo("London");
    table.string("attraction_name").notNullable();
    table.text("description");
    table.string("tags");
    table.string("image");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("attractions");
}
