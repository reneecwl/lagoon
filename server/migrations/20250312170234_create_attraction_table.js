/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("attractions", (table) => {
    table.increments("id").unsigned().primary();
    table.string("location", 100).notNullable();
    table.string("attraction_name", 100).notNullable();
    table.string("description", 255);
    table.string("tags", 255);
    table.string("image", 255);
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
