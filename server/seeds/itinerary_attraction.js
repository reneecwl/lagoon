/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("itinerary_attraction").del(); // Clear existing data

  await knex("itinerary_attraction").insert([
    { itinerary_id: 1, attraction_id: 1, user_notes: "Must see the clock chime at noon!" },
    { itinerary_id: 1, attraction_id: 2, user_notes: "Book tickets in advance." },
    { itinerary_id: 1, attraction_id: 6, user_notes: "Love it!." },
    { itinerary_id: 1, attraction_id: 8, user_notes: "Amazing." },
    { itinerary_id: 1, attraction_id: 9, user_notes: "Cant wait!" },
    { itinerary_id: 2, attraction_id: 11, user_notes: "Best visited at night for neon lights." },
    { itinerary_id: 2, attraction_id: 12, user_notes: "Try the street food near the temple." },
    { itinerary_id: 2, attraction_id: 13, user_notes: "Best visited at night for neon lights." },
    { itinerary_id: 3, attraction_id: 15, user_notes: "Bring a picnic for a sunny day!" },
    { itinerary_id: 3, attraction_id: 19, user_notes: "Bring a picnic for a sunny day!" },
  ]);
}
