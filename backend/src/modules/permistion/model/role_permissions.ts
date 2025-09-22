import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../shared/config/database";

interface RolePermissionAttributes {
  role_id: string;
  permission_id: string;
  created_at?: Date;
}

type RolePermissionCreationAttributes = Optional<
  RolePermissionAttributes,
  "created_at"
>;

class RolePermission
  extends Model<RolePermissionAttributes, RolePermissionCreationAttributes>
  implements RolePermissionAttributes
{
  public role_id!: string;
  public permission_id!: string;
  public readonly created_at!: Date;
}

RolePermission.init(
  {
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    permission_id: {
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
    modelName: "RolePermission",
    tableName: "role_permissions",
    underscored: true,
    timestamps: false,
  }
);

export default RolePermission;
