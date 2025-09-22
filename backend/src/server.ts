import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./shared/config/database";
import { syncDatabase } from "./shared/config/syncDatabase";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.route"
import specializationRoutes from "./modules/specialization/specialization.route"
import permissionRoutes from "./modules/permistion/permission.routes"
import doctorRoutes from "./modules/doctor/doctor.route"
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
  await syncDatabase();
})();


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/permission", permissionRoutes);
app.use("/api/specialization",specializationRoutes);
app.use("/api/doctors",doctorRoutes)
const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("PORT environment variable is not defined");
}
app.listen(PORT, () => {
  console.log(`🚀 Auth Service chạy tại http://localhost:${PORT}`);
});

