export function up(knex) {
  return knex.schema.createTable("itineraries", (table) => {
    table.increments("id").unsigned().primary();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE"); // If a user is deleted, delete all their itineraries

    table.string("location", 100).notNullable();
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.string("itinerary_name", 255);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

export function down(knex) {
  return knex.schema.dropTable("itineraries");
}
