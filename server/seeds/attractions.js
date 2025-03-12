/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("attractions").del();

  await knex("attractions").insert([
    {
      location: "London",
      attraction_name: "Big Ben",
      description: "Iconic clock tower and landmark in London.",
      tags: "historical,landmark",
      image: "https://example.com/bigben.jpg",
    },
    {
      location: "London",
      attraction_name: "Tower of London",
      description: "Medieval castle and former prison.",
      tags: "castle,history",
      image: "https://example.com/toweroflondon.jpg",
    },
    {
      location: "London",
      attraction_name: "British Museum",
      description: "World-famous museum with historical artifacts.",
      tags: "museum,culture",
      image: "https://example.com/britishmuseum.jpg",
    },
    {
      location: "London",
      attraction_name: "London Eye",
      description: "Ferris wheel offering panoramic city views.",
      tags: "view,landmark",
      image: "https://example.com/londoneye.jpg",
    },
    {
      location: "London",
      attraction_name: "Hyde Park",
      description: "Large city park with walking paths and a lake.",
      tags: "park,nature",
      image: "https://example.com/hydepark.jpg",
    },
    {
      location: "Tokyo",
      attraction_name: "Shibuya Crossing",
      description: "Famous busy pedestrian crossing.",
      tags: "urban,landmark",
      image: "https://example.com/shibuyacrossing.jpg",
    },
    {
      location: "Tokyo",
      attraction_name: "Senso-ji Temple",
      description: "Historic Buddhist temple in Asakusa.",
      tags: "temple,culture",
      image: "https://example.com/sensoji.jpg",
    },
    {
      location: "Tokyo",
      attraction_name: "Tokyo Tower",
      description: "Eiffel Tower-inspired landmark with city views.",
      tags: "landmark,view",
      image: "https://example.com/tokyotower.jpg",
    },
    {
      location: "Tokyo",
      attraction_name: "Akihabara",
      description: "Famous for electronics, anime, and gaming culture.",
      tags: "shopping,anime",
      image: "https://example.com/akihabara.jpg",
    },
    {
      location: "Tokyo",
      attraction_name: "Shinjuku Gyoen",
      description: "Beautiful park with cherry blossoms in spring.",
      tags: "nature,park",
      image: "https://example.com/shinjukugyoen.jpg",
    },
  ]);
}
