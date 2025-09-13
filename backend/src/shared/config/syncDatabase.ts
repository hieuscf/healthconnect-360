import sequelize from "./database";
import AuthUser from "../../modules/auth/auth.model"
import UserDetails  from "../../modules/users/user.model";

// Định nghĩa association
const defineAssociations = () => {
  // User - UserDetail (1:1)
    AuthUser.hasOne(UserDetails, {
    foreignKey: "user_id",
    as: "details",
  });
  UserDetails.belongsTo(AuthUser, {
    foreignKey: "user_id",
    as: "user",
  });
};

export const syncDatabase = async () => {
  try {
    defineAssociations();

    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    await sequelize.sync({ alter: true }); // alter để auto update table
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.error("❌ Unable to sync the database:", error);
  }
};