module.exports = (sequelize, Sequelize) => {
    const PasswordEntry = sequelize.define("passwordEntries", {
        site: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return PasswordEntry;
};
