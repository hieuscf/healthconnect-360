import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../shared/config/database";

interface PermissionAttributes {
  permission_id: string;
  permission_name:string;
  created_at?: Date;
}

type PermissionCreationAttributes = Optional<
  PermissionAttributes,
  "permission_id" | "created_at" 
>;

class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  public permission_id!: string;
  public permission_name!: string;
  public readonly created_at!: Date;
}

Permission.init(
  {
    permission_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    permission_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "permission",
    tableName: "permission",
    underscored: true, 
    timestamps: false, 
  }
);

export default Permission;
