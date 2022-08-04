'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tasks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false
            },
            assignee_id: {
              type: Sequelize.INTEGER,
              onDelete: 'CASCADE',
              references: {
                  model: 'users',
                  key: 'id'
              },
              allowNull: false
            },
            creator_id: {
              type: Sequelize.INTEGER,
              onDelete: 'CASCADE',
              references: {
                  model: 'users',
                  key: 'id'
              },
              allowNull: false
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()'),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()')
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tasks');
    }
};
