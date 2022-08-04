const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('user', {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
            freezeTableName: true,
            tableName: 'users',
            timestamps: false
        }
    );

    User.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());

        delete values.password;
        return values;
    }

    sequelizePaginate.paginate(User);

    return User
};
