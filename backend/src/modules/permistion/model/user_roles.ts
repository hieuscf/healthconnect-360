import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../shared/config/database";
import AuthUser from "../../auth/auth.model";
import Role from "./roles";

interface UserRoleAttributes {
  role_id: string;
  user_id: string;
  created_at?: Date;
}

type UserRoleCreationAttributes = Optional<
  UserRoleAttributes,
  "created_at"
>;

class UserRole
  extends Model<UserRoleAttributes, UserRoleCreationAttributes>
  implements UserRoleAttributes
{
  public role_id!: string;
  public user_id!: string;
  public readonly created_at!: Date;
}

UserRole.init(
  {
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "UserRole",
    tableName: "user_roles",
    underscored: true,
    timestamps: false,
  }
);

export default UserRole;
