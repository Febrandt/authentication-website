import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    database: 'authentication_website',
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    define: {timestamps: false}
});

sequelize.authenticate().then(() => {
    console.log('Database Connection Successfull!');
    }).catch(err => {
        console.error('Database Connection Error: ', err);
    });

