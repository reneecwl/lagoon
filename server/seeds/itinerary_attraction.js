/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("itinerary_attraction").del(); // Clear existing data

  await knex("itinerary_attraction").insert([
    { itinerary_id: 1, attraction_id: 1, user_notes: "Must see the clock chime at noon!" }, // Alice - Big Ben
    { itinerary_id: 1, attraction_id: 2, user_notes: "Book tickets in advance." }, // Alice - Tower of London
    { itinerary_id: 2, attraction_id: 6, user_notes: "Best visited at night for neon lights." }, // Bob - Shibuya Crossing
    { itinerary_id: 2, attraction_id: 7, user_notes: "Try the street food near the temple." }, // Bob - Senso-ji
    { itinerary_id: 3, attraction_id: 5, user_notes: "Bring a picnic for a sunny day!" }, // Charlie - Hyde Park
  ]);
}
