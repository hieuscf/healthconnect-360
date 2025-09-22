import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../shared/config/database";

interface AuthUserAttributes {
  user_id: string;
  email: string;
  password_hash: string;
  active: boolean;
  created_at?: Date;
}

type AuthUserCreationAttributes = Optional<
  AuthUserAttributes,
  "user_id" | "created_at"
>;

class AuthUser
  extends Model<AuthUserAttributes, AuthUserCreationAttributes>
  implements AuthUserAttributes
{
  public user_id!: string;
  public email!: string;
  public password_hash!: string;
  public active!: boolean;
  public readonly created_at!: Date;
}

AuthUser.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Email không hợp lệ" },
      },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // true = active, false = inactive
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "AuthUser",
    tableName: "auth_users",
    underscored: true, // map created_at thay vì createdAt
    timestamps: false, 
    indexes: [
      { unique: true, fields: ["email"] }, 
    ],
  }
);

export default AuthUser;
