module.exports=(sequelize, DataTypes) => {
    return sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                validate: {
                    isUUID: 4,
                },
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },

            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            tableName: "Users",
        }
    );

}

