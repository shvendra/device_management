'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class device_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  device_transaction.init({
    id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    current_temp_a: DataTypes.INTEGER,
    current_temp_b: DataTypes.INTEGER,
    current_door_count: DataTypes.INTEGER,
    life_door_count: DataTypes.INTEGER,
    current_qty: DataTypes.INTEGER,
    life_qty: DataTypes.INTEGER,
    current_burn_cycle: DataTypes.INTEGER,
    life_burn_cycle: DataTypes.INTEGER,
    last_on_time: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
  },
  last_of_time: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    last_status: {
        type: 'TIMESTAMP',
        allowNull: false
    },
    status: DataTypes.TEXT,
    status_type: DataTypes.INTEGER,
    spiral_a_status: DataTypes.INTEGER,
    spiral_b_status: DataTypes.INTEGER,
    current_cash: DataTypes.INTEGER,
    life_cash: DataTypes.INTEGER,
    device_id: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'device_transaction',
    modelName: 'device_transaction',
  });
  return device_transaction;
};