import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load biến môi trường từ file .env


const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = Number(process.env.DB_PORT);


if (!dbName || !dbUser || !dbPassword) {
  console.log(dbName , dbHost , dbPassword , dbUser , dbPort)
  throw new Error(
    "❌ Thiếu biến môi trường cho DB (DB_NAME, DB_USER, DB_PASSWORD)"
  );
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  logging: false, // Tắt log query SQL
  // logging: console.log, // Tắt log query SQL
});

export default sequelize;
