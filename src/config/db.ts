import {
  createConnection,
  getConnectionManager,
  Connection,
  getConnection,
} from "typeorm";
import { Book } from "../modules/books/entities/Book";

export async function pgConnection(): Promise<Connection> {
  try {
    if (getConnectionManager().has("default")) {
      await getConnection().close();
    }
  } catch (error) {
    console.log("error");
  }

  return await createConnection({
    name: "default",
    type: "postgres",
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT!),
    migrationsTableName: `${process.env.DATABASE_NAME}_migration_table`,
    entities: [Book],
    logging: false,
    synchronize: true,
  });
}
