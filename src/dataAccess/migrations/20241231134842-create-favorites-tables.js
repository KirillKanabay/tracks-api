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
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: {
            tableName: 'User',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    };

    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('FavoriteTrack', {
        ...baseConfig,
        trackId: {
          type: Sequelize.STRING,
          allowNull: true,
          references: {
            model: {
              tableName: 'Track',
            },
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      });
      await queryInterface.createTable('FavoriteAlbum', {
        ...baseConfig,
        albumId: {
          type: Sequelize.STRING,
          allowNull: true,
          references: {
            model: {
              tableName: 'Album',
            },
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      });
      await queryInterface.createTable('FavoriteArtist', {
        ...baseConfig,
        artistId: {
          type: Sequelize.STRING,
          allowNull: true,
          references: {
            model: {
              tableName: 'Artist',
            },
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      });
      await transaction.commit();
    } catch (err){
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('FavoriteTrack');
      await queryInterface.dropTable('FavoriteAlbum');
      await queryInterface.dropTable('FavoriteArtist');
      await transaction.commit();
    } catch (err){
      await transaction.rollback();
      throw err;
    }
  }
};
