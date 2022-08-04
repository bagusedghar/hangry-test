const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    let Task = sequelize.define('task', {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            assignee_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            creator_id: {
                type: DataTypes.INTEGER,
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
            tableName: 'tasks',
            timestamps: false
        },
        {
            classMethods: {
                associate:function(models) {
                    Task.belongsTo(models.user);
                }
            }
        }
    );

    Task.associate = function (models) {
        Task.belongsTo(models.user, {
            foreignKey: 'assignee_id',
            as: 'assignee'
        });
        Task.belongsTo(models.user, {
            foreignKey: 'creator_id',
            as: 'creator'
        });
    };

    sequelizePaginate.paginate(Task);

    return Task
};
