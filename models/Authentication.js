const Sequelize = require('sequelize');
const db = require('../config/database');

const Authentication = db.define('Authentication', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },phone: {
      type: Sequelize.STRING,
      allowNull: false
    }
    ,wallet_address: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    // Other model options go here
    tableName: 'users',
    timestamps: true
  });
  
  module.exports = Authentication;
