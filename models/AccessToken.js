const Sequelize = require('sequelize');
const db = require('../config/database');

const AccessToken = db.define('AccessToken', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
    tableName: 'access_token',
    timestamps: true
  });
  
  module.exports = AccessToken;
