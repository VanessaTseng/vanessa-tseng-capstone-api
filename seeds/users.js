/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      name: "Maya Ridgewood",
      email: "mayaridgewood@email.com",
      photo: "/user-images/maya-ridgewood.jpg",
    },
    {
      id: 2,
      name: "John Doe",
      email: "johndoe@email.com",
      photo: "/user-images/john-doe.jpg",
    },
    {
      id: 3,
      name: "Lila Thornwell",
      email: "lilathornwell@email.com",
      photo: "/user-images/lila-thornwell.jpg",
    },
    {
      id: 4,
      name: "Evan Castrow",
      email: "evancastrow@email.com",
      photo: "/user-images/evan-castrow.jpg",
    },
    {
      id: 5,
      name: "Asher Finelake",
      email: "asherfinelake@email.com",
      photo: "/user-images/asher-finelake.jpg",
    },
    {
      id: 6,
      name: "Selena Ashcroft",
      email: "selenaashcroft@email.com",
      photo: "/user-images/selena-ashcroft.jpg",
    },
    {
      id: 7,
      name: "Taylor Reed",
      email: "taylorreed@email.com",
      photo: "/user-images/taylor-reed.jpg",
    },
    {
      id: 8,
      name: "Jordan Avery",
      email: "jordanavery@email.com",
      photo: "/user-images/jordan-avery.jpg",
    },
    {
      id: 9,
      name: "Morgan Blake",
      email: "morganblake@email.com",
      photo: "/user-images/morgan-blake.jpg",
    },
  ]);
}
