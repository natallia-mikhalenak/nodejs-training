import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../loaders/db_loader';

export class UserModel extends Model {}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_deleted'
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
});
