import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../configs/db.config'; // import sequelize instance

// Define the TypeScript interface for the model
interface UserChallengeAttributes {
  id: number;
  challenge: string;
  created_at: Date;
  expired_at?: Date | null;
  created_by: number;
}

// Create a type for the creation attributes (optional fields like `id` are not required on insert)
interface UserChallengeCreationAttributes extends Optional<UserChallengeAttributes, 'id'> { }

// Define the model class
class UserChallenge extends Model<UserChallengeAttributes, UserChallengeCreationAttributes> implements UserChallengeAttributes {
  public id!: number;
  public challenge!: string;
  public created_at!: Date;
  public expired_at?: Date | null;
  public created_by!: number;

  // Timestamps fields
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model with Sequelize
UserChallenge.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    challenge: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    expired_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // This should be your Sequelize instance
    tableName: 'c_user_challenge',
    modelName: 'UserChallenge',
    timestamps: false, // This will add `createdAt` and `updatedAt` columns
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  }
);

export default UserChallenge;
