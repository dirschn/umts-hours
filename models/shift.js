'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Shift extends Model {
    static associate(models) {
      Shift.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Shift.init({
    name: {
      type: DataTypes.STRING,
      defaultValue: 'Programmer',
      allowNull: false
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Shift',
  });

  return Shift;
};
