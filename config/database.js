const { Sequelize } = require('sequelize');

// Initialize Sequelize with database credentials
const sequelize = new Sequelize('beta_mysql', 'admin', '123qwe!@#', {
    host: 'localhost',
    dialect: 'mysql',
});

// Test the connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


testConnection();
// Export the Sequelize instance
module.exports = sequelize;