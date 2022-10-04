const Sequelize = require('sequelize');
const db = require('../config/database');

const UserAccount = db.define('UserAccount', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    y_balance: {
        type: Sequelize.FLOAT
        // allowNull defaults to true
    }
    ,wallet_address: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    // Other model options go here
    tableName: 'bc_sim_user_accounts',
    timestamps: true
  });
  
  module.exports = UserAccount;
