'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class device_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  device_details.init({
    serial_number : {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    customer: DataTypes.TEXT,
    name: DataTypes.TEXT,
    state: DataTypes.TEXT,
    city: DataTypes.TEXT,
    project: DataTypes.TEXT,
    site: DataTypes.TEXT,
    model: DataTypes.TEXT,
    shiped_on: DataTypes.TEXT,
    installed_on: {
      type: 'TIMESTAMP',
      // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
  },
    warranty_valid: {
        type: 'TIMESTAMP',
        allowNull: false
    },
    unit_price: DataTypes.INTEGER,
    min_temp_a: DataTypes.INTEGER,
    max_temp_a: DataTypes.INTEGER,
    min_temp_b: DataTypes.INTEGER,
    max_temp_b: DataTypes.INTEGER,
    spiral_a_max_qty: DataTypes.INTEGER,
    spiral_b_max_qty: DataTypes.INTEGER,
    max_door_count: DataTypes.INTEGER,
    max_burn_time: DataTypes.INTEGER,
    forced_burn_time: {
      type: 'TIMESTAMP',
      allowNull: false
  },
  }, {
    sequelize,
    tableName: 'device_details',
    modelName: 'device_details',
  });
  return device_details;
};