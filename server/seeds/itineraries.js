/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("itineraries").del();
  await knex.raw("ALTER TABLE itineraries AUTO_INCREMENT = 1");
  await knex("itineraries").insert([
    {
      user_id: 1,
      location: "London",
      start_date: "2025-03-12",
      end_date: "2025-03-15",
      itinerary_name: "Spring in London",
    },
    {
      user_id: 2,
      location: "Tokyo",
      start_date: "2025-03-13",
      end_date: "2025-03-17",
      itinerary_name: "Golden Week in Tokyo",
    },
    {
      user_id: 3,
      location: "London",
      start_date: "2025-03-14",
      end_date: "2025-06-19",
      itinerary_name: "Summer in London",
    },
  ]);
}
