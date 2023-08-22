import { DataTypes, Model } from 'sequelize';

export default class Users extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            last_login: DataTypes.STRING,
            ip: DataTypes.STRING,
            whitelisted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            },
            banned: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            timestamps: false,
            tableName: 'vrp_users',
            sequelize
        })
    }
}