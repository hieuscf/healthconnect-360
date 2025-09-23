import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../shared/config/database";
import AuthUser from "../auth/auth.model";

interface PatientAttributes {
  patient_id: string;
  user_id: string; // FK tới AuthUser
  blood_group: string;  // nhóm máu: A, B, AB, O, Rh+/- 
  allergies: string;    // dị ứng
  chronic_conditions: string; // bệnh mãn tính
  medical_history: string; // tiền sử bệnh lý
  current_medications: string; // thuốc đang dùng
  vaccinations: string; // tiêm chủng
  height: number; // cm
  weight: number; // kg
  created_at?: Date;
  updated_at?: Date;
}

type PatientCreationAttributes = Optional<
  PatientAttributes,
  "patient_id" | "created_at" | "updated_at"
>;

class Patient
  extends Model<PatientAttributes, PatientCreationAttributes>
  implements PatientAttributes 
{
  declare patient_id: string;
  declare user_id: string;
  declare blood_group: string;
  declare allergies: string;
  declare chronic_conditions: string;
  declare medical_history: string;
  declare current_medications: string;
  declare vaccinations: string;
  declare height: number;
  declare weight: number;
  declare readonly created_at?: Date;
  declare readonly updated_at?: Date;
}

Patient.init(
  {
    patient_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
  type: DataTypes.UUID,
  allowNull: false,
  references: {
    model: "auth_users", // chính xác theo tableName trong AuthUser
    key: "user_id",
  },
},
    blood_group: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    allergies: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    chronic_conditions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medical_history: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    current_medications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    vaccinations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Patient",
    tableName: "patients",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);


export default Patient;
