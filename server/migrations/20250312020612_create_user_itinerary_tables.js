/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up(knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").unsigned().primary(); // Ensure UNSIGNED
      table.string("user_name").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("itineraries", (table) => {
      table.increments("id").unsigned().primary(); // Ensure UNSIGNED
      table.string("location").notNullable();
      table.date("date").notNullable();
      table.integer("days").notNullable();
      table.string("itinerary_name").nullable();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE"); // Ensure UNSIGNED
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function down(knex) {
  return knex.schema.dropTable("itineraries").dropTable("users");
}
