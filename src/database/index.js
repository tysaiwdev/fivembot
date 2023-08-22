import { Sequelize } from 'sequelize';

const mysql = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        dialect: process.env.MYSQL_DIALECT,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT
    }
);

export default mysql