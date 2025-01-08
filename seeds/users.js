/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { id: 1, name: "Maya Ridgewood", email: "mayaridgewood@email.com" },
    { id: 2, name: "John Doe", email: "johndoe@email.com" },
    { id: 3, name: "Lila Thornwell", email: "lilathornwell@email.com" },
    { id: 4, name: "Evan Castrow", email: "evancastrow@email.com" },
    { id: 5, name: "Asher Finelake", email: "asherfinelake@email.com" },
    { id: 6, name: "Selena Ashcroft", email: "selenaashcroft@email.com" },
    { id: 7, name: "Taylor Reed", email: "taylorreed@email.com" },
    { id: 8, name: "Jordan Avery", email: "jordanavery@email.com" },
    { id: 9, name: "Morgan Blake", email: "morganblake@email.com" },
  ]);
}
