import sequelize from "./database";
import AuthUser from "../../modules/auth/auth.model"
import UserDetails  from "../../modules/users/user.model";
import Doctor from "../../modules/doctor/doctor.model";
import Specialization from "../../modules/specialization/specialization.model";
import DoctorSpecialization from "../../modules/relations/doctorSpecialization.model";
import Role from "../../modules/permistion/model/roles";
import Permission from "../../modules/permistion/model/permissions";
import RolePermission from "../../modules/permistion/model/role_permissions";
import UserRole from "../../modules/permistion/model/user_roles";

// Định nghĩa association
const defineAssociations = () => {
  // AuthUser - UserDetails (1:1)
  AuthUser.hasOne(UserDetails, {
    foreignKey: "user_id",
    as: "details",
  });
  UserDetails.belongsTo(AuthUser, {
    foreignKey: "user_id",
    as: "user",
  });

  // AuthUser - Doctor (1:1)
  AuthUser.hasOne(Doctor, {
    foreignKey: "user_id",
    as: "doctor",
  });
  Doctor.belongsTo(AuthUser, {
    foreignKey: "user_id",
    as: "user",
  });

  // Doctor - Specialization (N:M)
  Doctor.belongsToMany(Specialization, {
    through: DoctorSpecialization,
    foreignKey: "doctor_id",
    as: "specializations",
  });
  Specialization.belongsToMany(Doctor, {
    through: DoctorSpecialization,
    foreignKey: "specialization_id",
    as: "doctors",
  });

  // Role - Permission (N:M)
  Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: "role_id",
    as: "permissions",
  });
  Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: "permission_id",
    as: "roles",
  });

  // AuthUser - Role (N:M)
  AuthUser.belongsToMany(Role, {
    through: UserRole,
    foreignKey: "user_id",
    as: "roles",
  });
  Role.belongsToMany(AuthUser, {
    through: UserRole,
    foreignKey: "role_id",
    as: "users",
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