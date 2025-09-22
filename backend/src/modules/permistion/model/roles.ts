import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../shared/config/database";

interface RoleAttributes {
  role_id: string;
  role_name:string;
  description:string;
  active:boolean;
  created_at?: Date;
}

type RoleCreationAttributes = Optional<
  RoleAttributes,
  "role_id" | "created_at" 
>;

class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  public role_id!: string;
  public role_name!: string;
  public description!:string;
  public active!: boolean;
  public readonly created_at!: Date;
}

Role.init(
  {
    role_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
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
    modelName: "role",
    tableName: "role",
    underscored: true, 
    timestamps: false, 
  }
);

export default Role;
