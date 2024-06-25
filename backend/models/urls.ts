import { pool } from "./db";
export class Urls {
  static async createTable() {
    try {
      await pool.query(`
            CREATE TABLE IF NOT EXISTS urls(
                id SERIAL PRIMARY KEY,
                original_url TEXT NOT NULL,
                short_url VARCHAR(6) NOT NULL UNIQUE,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                hit_count INT DEFAULT 0
            );
        `);
      console.log("Table urls created successfully.");
    } catch (error) {
      console.log("Error creating 'urls' table.", error);
    }
  }
  static async dropTable(): Promise<boolean> {
    try {
      const exists = await pool.query(`
          SELECT EXISTS (
            SELECT 1
            FROM   information_schema.tables
            WHERE  table_schema = 'public'
            AND    table_name = 'urls'
          );
        `);
      if (!exists.rows[0].exists) {
        console.log("Table 'urls' does not exist.");
        return false;
      }
      await pool.query(`
        DROP TABLE urls;
      `);
      console.log("Table 'urls' dropped successfully.");
      return true;
    } catch (error) {
      console.log("Error dropping 'urls' table.", error);
      return false;
    }
  }
}
