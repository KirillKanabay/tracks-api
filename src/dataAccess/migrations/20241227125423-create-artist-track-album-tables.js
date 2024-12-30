'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const baseConfig = {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.BIGINT,
        allowNull: true,
      }};

    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('Artist', {
        ...baseConfig,
        name: { type: Sequelize.STRING, allowNull: false },
        grammy: { type: Sequelize.BOOLEAN, allowNull: false },
      });

      await queryInterface.createTable('Album', {
        ...baseConfig,
        name: { type: Sequelize.STRING, allowNull: false },
        year: { type: Sequelize.INTEGER, allowNull: false },
        artistId: {
          type: Sequelize.STRING,
          allowNull: true,
          references: {
            model: {
              tableName: 'Artist',
            },
            key: 'id',
          },
          onDelete: 'SET NULL'
        },
      });

      await queryInterface.createTable('Track', {
        ...baseConfig,
        name: { type: Sequelize.STRING, allowNull: false },
        duration: { type: Sequelize.INTEGER, allowNull: false },
        artistId: {
          type: Sequelize.STRING,
          allowNull: true,
          references: {
            model: {
              tableName: 'Artist',
            },
            key: 'id',
          },
          onDelete: 'SET NULL'
        },
        albumId: {
          type: Sequelize.STRING,
          allowNull: true,
          references: {
            model: {
              tableName: 'Album',
            },
            key: 'id',
          },
          onDelete: 'SET NULL'
        },
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('Track');
      await queryInterface.dropTable('Album');
      await queryInterface.dropTable('Artist');
      await transaction.commit();
    } catch (err){
      await transaction.rollback();
      throw err;
    }
  }
};