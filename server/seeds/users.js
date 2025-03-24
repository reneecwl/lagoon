/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("users").del();

  await knex("users").insert([
    { id: 1, user_name: "Amanda" },
    { id: 2, user_name: "Benson" },
    { id: 3, user_name: "Charlie" },
  ]);
}
