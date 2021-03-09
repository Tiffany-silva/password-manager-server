/**
 * index.js
 * @author: Supeshala Silva
 * @description: This represents the database configuration, creation and table initializations
 *               Includes all the table creations with relationships
 */

const dbConfig = require("../config/config.db");
const Sequelize = require("sequelize");
const userModel = require("./user.js");
const categoryModel = require("./category.js");
const passwordEntryModel = require("./passwordEntry.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize);
db.category = categoryModel(sequelize, Sequelize);
db.passwordEntry=passwordEntryModel(sequelize, Sequelize);

db.user.hasMany(db.passwordEntry);
db.passwordEntry.belongsTo(db.user);

db.category.hasMany(db.passwordEntry);
db.passwordEntry.belongsTo(db.category);


sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & tables created!`)
        // initial();
    });


module.exports = db;
