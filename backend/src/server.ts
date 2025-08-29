import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./shared/config/database";
import authRoutes from "./modules/auth/auth.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

// ✅ Check DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ connect database success!");

    await sequelize.sync({ alter: true });

    console.log("✅ Sequelize has been synchronized model with Database");
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("PORT environment variable is not defined");
}
app.listen(PORT, () => {
  console.log(`🚀 Auth Service chạy tại http://localhost:${PORT}`);
});

