import { DataTypes, Model } from "sequelize";
import sequelize from "../../shared/config/database";
import Doctor from "../doctor/doctor.model";
import Specialization from "../specialization/specialization.model";

interface DoctorSpecializationAttributes {
  doctor_id: string;
  specialization_id: string;
}

class DoctorSpecialization
  extends Model<DoctorSpecializationAttributes>
  implements DoctorSpecializationAttributes
{
  public doctor_id!: string;
  public specialization_id!: string;
}

DoctorSpecialization.init(
  {
    doctor_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Doctor,
        key: "doctor_id",
      },
      onDelete: "CASCADE",
    },
    specialization_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Specialization,
        key: "specialization_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "DoctorSpecialization",
    tableName: "doctor_specialization",
    underscored: true,
    timestamps: false,
  }
);

// Associations
Doctor.belongsToMany(Specialization, {
  through: DoctorSpecialization,
  foreignKey: "doctor_id",
});
Specialization.belongsToMany(Doctor, {
  through: DoctorSpecialization,
  foreignKey: "specialization_id",
});

export default DoctorSpecialization;
