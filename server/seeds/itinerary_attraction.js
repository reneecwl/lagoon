/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("itinerary_attraction").del();
  await knex.raw("ALTER TABLE itinerary_attraction AUTO_INCREMENT = 1");
  await knex("itinerary_attraction").insert([
    { itinerary_id: 1, attraction_id: 1, user_notes: "Must see the clock chime at noon!", day: 1 },
    { itinerary_id: 1, attraction_id: 2, user_notes: "Book tickets in advance.", day: 1 },
    { itinerary_id: 1, attraction_id: 6, user_notes: "Love it!.", day: 1 },
    { itinerary_id: 1, attraction_id: 8, user_notes: "Amazing.", day: 2 },
    { itinerary_id: 1, attraction_id: 9, user_notes: "Perfect for a rainy day", day: 2 },
    { itinerary_id: 1, attraction_id: 3, user_notes: "Looking forward to it", day: 3 },
    { itinerary_id: 1, attraction_id: 4, user_notes: "Can skip if we are too tired", day: 4 },
    { itinerary_id: 2, attraction_id: 11, user_notes: "Best visited at night for neon lights.", day: 1 },
    { itinerary_id: 2, attraction_id: 12, user_notes: "Try the street food near the temple.", day: 1 },
    { itinerary_id: 2, attraction_id: 13, user_notes: "Best visited at night for neon lights.", day: 2 },
    { itinerary_id: 3, attraction_id: 15, user_notes: "Bring a picnic for a sunny day!", day: 1 },
    { itinerary_id: 3, attraction_id: 11, user_notes: "Visit in the evening for the best experience.", day: 1 },
    { itinerary_id: 3, attraction_id: 12, user_notes: "Explore the nearby shops after the temple.", day: 2 },
    { itinerary_id: 3, attraction_id: 19, user_notes: "Bring a picnic for a sunny day!", day: 3 },
    { itinerary_id: 3, attraction_id: 20, user_notes: "Visit the zoo if there’s time.", day: 4 },
    { itinerary_id: 23, attraction_id: 1, user_notes: "Start the trip with this iconic landmark.", day: 1 },
    { itinerary_id: 23, attraction_id: 3, user_notes: "Spend the morning exploring artifacts.", day: 2 },
    { itinerary_id: 23, attraction_id: 6, user_notes: "Watch the Changing of the Guard if possible.", day: 3 },
    { itinerary_id: 23, attraction_id: 10, user_notes: "End the trip with a great view of the city.", day: 4 },
  ]);
}
