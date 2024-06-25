import { Urls } from "../models/urls";
import { pool } from "../models/db";
import { generateRandomURL } from "@/lib/generateRandomURL";
const BASE_URL = process.env.BASE_URL;
const URL_TO_CALL =
  process.env.NODE_ENV == "development" ? "http://localhost:3000" : BASE_URL;

export class UrlsController {
  static async init(): Promise<void> {
    try {
      await Urls.createTable();
    } catch (error) {
      console.log("Error in UrlsController.init()", error);
    }
  }
  static async drop(): Promise<boolean> {
    try {
      const dropped = await Urls.dropTable();
      return dropped;
    } catch (error) {
      console.log("Error in UrlsController.drop()", error);
      return false;
    }
  }
  static async createUrl(
    original_url: string
  ): Promise<{ status: -1 | 0 | 1; shortUrl?: string }> {
    try {
      const exists = await pool.query(
        `
                SELECT * FROM urls
                    WHERE original_url = $1;
            `,
        [original_url]
      );
      if (exists.rowCount)
        return { status: 0, shortUrl: exists.rows[0].short_url }; //La url original ya existía
      let shortUrl: string = "";
      do {
        shortUrl = generateRandomURL();
      } while (
        (
          await pool.query(
            `
              SELECT * FROM urls
              WHERE short_url = $1;
            `,
            [shortUrl]
          )
        ).rowCount
      );
      const newShortUrl = await pool.query(
        `
                INSERT INTO urls (original_url, short_url)
                    VALUES ($1, $2)
                    RETURNING *;
            `,
        [original_url, shortUrl]
      );
      return {
        status: 1,
        shortUrl: `${URL_TO_CALL}/${newShortUrl.rows[0].short_url}`,
      }; //Devuelve la nueva short_url
    } catch (error) {
      console.log("Error in UrlsController.createUrl()", error);
      return { status: -1 }; //Error
    }
  }
  static async getAll(): Promise<Urls[] | []> {
    try {
      const allUrls = await pool.query(`
                SELECT * FROM urls;
            `);
      return allUrls.rows;
    } catch (error) {
      console.log("Error in UrlsController.getAll()", error);
      throw error;
    }
  }
  static async getUrlByShortURL(
    shortURL: string
  ): Promise<{ status: -1 | 0 | 1; url?: Urls }> {
    try {
      const urlQuery = await pool.query(
        `
          SELECT * FROM urls
            WHERE short_url = $1;
        `,
        [shortURL]
      );
      if (!urlQuery.rowCount) return { status: 0 };
      return { status: 1, url: urlQuery.rows[0] };
    } catch (error) {
      console.log("Error in UrlsController.getUrlByShortURL()", error);
      return { status: -1 }; //Error
    }
  }
  static async getUrlById(
    id: number
  ): Promise<{ status: -1 | 0 | 1; url?: Urls }> {
    try {
      const url = await pool.query(
        `
                SELECT * FROM urls
                    WHERE id = $1;
            `,
        [id]
      );
      if (!url.rowCount) return { status: 0 }; //La url no existe
      return { status: 1, url: url.rows[0] }; //La url existe
    } catch (error) {
      console.log("Error in UrlsController.getUrlById()", error);
      return { status: -1 }; //Error
    }
  }
  static async increaseHitCount(
    id: number
  ): Promise<{ status: -1 | 0 | 1; url?: Urls }> {
    try {
      const exists = await pool.query(
        `
            SELECT * FROM urls
                WHERE id = $1;
        `,
        [id]
      );
      if (!exists.rowCount) return { status: 0 }; //La url que se intenta cambiar no existe
      const updatedUrl = await pool.query(
        `
            UPDATE urls
                SET hit_count = hit_count + 1
                WHERE id = $1
                RETURNING *;
        `,
        [id]
      );
      return { status: 1, url: updatedUrl.rows[0] };
    } catch (error) {
      console.log("Error in UrlsController.increaseHitCount()", error);
      return { status: -1 };
    }
  }
  static async deleteUrl(id: number): Promise<{ status: -1 | 0 | 1 }> {
    try {
      const exists = await pool.query(
        `
                SELECT * FROM urls
                    WHERE id = $1;
            `,
        [id]
      );
      if (!exists.rowCount) return { status: 0 }; //La url que se intenta eliminar no existe
      await pool.query(
        `
                DELETE FROM urls
                    WHERE id = $1;
            `,
        [id]
      );
      return { status: 1 };
    } catch (error) {
      console.log("Error in UrlsController.deleteUrl()", error);
      return { status: -1 };
    }
  }
}
