const User=require("./user");

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      idProdus: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
          isUUID: 4,
        },
      },
      numeProdus: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      idUser: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      categorie: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      cantitate: DataTypes.INTEGER,
      dataExpirare: {
        type: DataTypes.DATE,
        allowNull: false
      },
      valabil: DataTypes.BOOLEAN
    },
    {
      tableName: "Products",
    }
  );


  return Products;
};
