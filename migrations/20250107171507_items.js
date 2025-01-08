/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("items", (table) => {
    table.increments("item_id").primary();
    table
      .integer("bill_id")
      .unsigned()
      .notNullable()
      .references("bill_id")
      .inTable("bills")
      .onDelete("CASCADE");
    table.integer("qty").unsigned().notNullable().defaultTo(1);
    table.string("item_name").notNullable();
    table.decimal("item_price", 8, 2).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("items");
}
