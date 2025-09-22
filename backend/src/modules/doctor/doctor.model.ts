import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../shared/config/database";
import AuthUser from "../auth/auth.model";


interface DoctorAttributes {
  doctor_id: string;
  user_id: string; // foreign key tới AuthUser
  degree: string;  // học vị (BS, ThS, TS, PGS…)
  experience_years: number; // số năm kinh nghiệm
  bio: string;
  clinic: string;  // nơi công tác
  rating: number;
  status: "active" | "inactive" | "on_leave";
  licenseNumber:string;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

type DoctorCreationAttributes = Optional<
  DoctorAttributes,
  "doctor_id" | "rating" | "active" | "created_at" | "updated_at"
>;

class Doctor
  extends Model<DoctorAttributes, DoctorCreationAttributes>
  implements DoctorAttributes 
{
  [x: string]: any;
  public doctor_id!: string;
  public user_id!: string;
  public degree!: string;
  public experience_years!: number;
  public bio!: string;
  public clinic!: string;
  public rating!: number;
  public status!: "active" | "inactive" | "on_leave";
  public licenseNumber!:string;
  public active!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
  public user?: AuthUser;

}

Doctor.init(
  {
    doctor_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: AuthUser,
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    experience_years: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    clinic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "on_leave"),
      defaultValue: "active",
    }, 
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    licenseNumber: {
      type: DataTypes.STRING,
      defaultValue:  true,
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
    modelName: "Doctor",
    tableName: "doctor",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Doctor;
