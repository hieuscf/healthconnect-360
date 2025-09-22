import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../shared/config/database";

interface SpecializationAttributes {
  specialization_id: string;
  specialization_name: string;
  description?: string;
  active: boolean;
  created_at?: Date;
}

type SpecializationCreationAttributes = Optional<
  SpecializationAttributes,
  "specialization_id" | "description" | "active" | "created_at"
>;

class Specialization
  extends Model<SpecializationAttributes, SpecializationCreationAttributes>
  implements SpecializationAttributes
{
  public specialization_id!: string;
  public specialization_name!: string;
  public description?: string;
  public active!: boolean;
  public created_at?: Date;
}

Specialization.init(
  {
    specialization_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    specialization_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Specialization",
    tableName: "specialization",
    underscored: true, 
    timestamps: false,
  }
);

export default Specialization;
