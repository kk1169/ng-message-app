import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./entity/UserEntity";
import "dotenv/config";
import { ProjectEntity } from "./entity/ProjectEntity";
import { TodoEntity } from "./entity/TodoEntity";
import { MessageEntity } from "./entity/MessageEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity, ProjectEntity, TodoEntity, MessageEntity],
  synchronize: true,
  logging: false,
});
