import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../shared/config/database.config"


export class User extends Model {
    declare id: number;
    declare username: string;
    declare email: string;
    declare verified: boolean;
    declare password: string;
    declare admin: boolean;
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: new DataTypes.STRING(50),
        allowNull: false,
        unique: 'username',
      },
      email: {
        type: new DataTypes.STRING(254),
        allowNull: false,
        unique: 'email',
      },
      verified: {
        type: new DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      admin: {
        type: new DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      tableName: 'users',
      sequelize,
      timestamps: false
    }
  );

await User.sync({alter:true})