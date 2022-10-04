const Sequelize = require('sequelize');
const db = require('../config/database');

const MasterAccount = db.define('MasterAccount', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total_in_circulation: {
        type: Sequelize.FLOAT
    },
    current_balance: {
        type: Sequelize.FLOAT
        // allowNull defaults to true
    }
    ,wallet_address: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    // Other model options go here
    tableName: 'bc_sim_master_accounts',
    timestamps: true
  });
  
  module.exports = MasterAccount;
