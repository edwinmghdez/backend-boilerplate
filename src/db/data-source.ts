import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ['src/entities/*.entity{.ts,.js}'],
    migrations: ['src/db/migrations/*{.ts,.js}'],
    migrationsTableName: "migrations",
})
