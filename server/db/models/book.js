'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      coverImage: DataTypes.STRING, 
      userId: DataTypes.INTEGER 
    },
    {
      sequelize,
      modelName: 'Book',
    },
  );
  return Book;
};
