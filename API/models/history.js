'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    static associate(models) {
    }
  };
  history.init({
    id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    operation: DataTypes.TEXT,
    operation_by: DataTypes.TEXT,
    changes: DataTypes.TEXT,
    updatedAt: {
      type: 'TIMESTAMP',
      allowNull: false
    }
    }, {
    sequelize,
    tableName: 'history',
    modelName: 'history',
  });
  return history;
};