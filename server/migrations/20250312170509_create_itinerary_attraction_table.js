/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("itinerary_attraction", (table) => {
    table.integer("itinerary_id").unsigned().notNullable().references("id").inTable("itineraries").onDelete("CASCADE");
    table.integer("attraction_id").unsigned().notNullable().references("id").inTable("attractions").onDelete("CASCADE");
    table.string("user_notes", 255);
    table.primary(["itinerary_id", "attraction_id"]);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("itinerary_attraction");
}
