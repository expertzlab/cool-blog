const { Sequelize } = require('sequelize');
const config = require('./config.json');

// Create a Sequelize instance with the development configuration
const sequelize = new Sequelize(config.development);

// Define a simple User model
const User = sequelize.define('User', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

// Synchronize the model with the database (creates the table if it doesn't exist)
sequelize.sync()
  .then(() => {
    console.log('Database and tables are synchronized.');
  })
  .catch((err) => {
    console.error('Error synchronizing the database:', err);
  });

