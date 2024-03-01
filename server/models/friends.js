module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Friends", {
        idPrieten: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            validate: {
                isUUID: 4,
            },
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        userIdLocal: {
            type: DataTypes.UUID,
        },
        eticheta: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: "Friends",
    });
};
