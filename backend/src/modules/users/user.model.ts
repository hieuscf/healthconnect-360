import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../shared/config/database";
import AuthUser from "../auth/auth.model";
import dotenv from "dotenv";

const Avatar = process.env.AVATAR;

interface UserDetailsAttributes {
  user_information_id: string;
  user_id: string; // foreign key
  full_name: string | null;
  age:number | null;
  birthday: Date | null;
  avatar_image:string;
  phone: string | null;
  citizen_id: string | null;
  health_insurance_id: string | null;
  country: string | null;
  city: string | null;
  postal_code: string | null;
  tax_id: string | null;
  created_at?: Date;
}

type UserDetailsCreationAttributes = Optional<
  UserDetailsAttributes,
  "user_information_id" | "created_at"
>;

class UserDetails
  extends Model<UserDetailsAttributes, UserDetailsCreationAttributes>
  implements UserDetailsAttributes
{
  public user_information_id!: string;
  public user_id!: string;
  public full_name!: string;
  public age!: number;
  public birthday!: Date;
  public avatar_image!:string;
  public phone!: string;
  public citizen_id!: string;
  public health_insurance_id!: string;
  public country!: string;
  public city!: string;
  public postal_code!: string;
  public tax_id!: string;
  public readonly created_at!: Date;
}

UserDetails.init(
  {
    user_information_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "auth_users", // bảng gốc
        key: "user_id",      // cột trong bảng auth_users
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    avatar_image: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: Avatar,
      validate: {
        isUrl: { msg: "Avatar must be a valid URL" },
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    citizen_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    health_insurance_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    tax_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "UserDetails",
    tableName: "user_details",
    underscored: true,
    timestamps: false,
  }
);

export default UserDetails;