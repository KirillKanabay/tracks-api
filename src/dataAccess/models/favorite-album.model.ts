import {BaseModel} from "./base.model";
import {DataTypes, ForeignKey, NonAttribute} from "sequelize";
import {User} from "./user.model";
import {FavoriteAlbumEntity} from "../../favorites/entities/favorite-album.entity";
import {Album} from "./album.model";
import sequelize from "sequelize/types/sequelize";

export class FavoriteAlbum extends BaseModel<FavoriteAlbum> implements FavoriteAlbumEntity{
    declare userId: ForeignKey<User['id']>;
    declare albumId: ForeignKey<Album['id']>;

    declare user?: NonAttribute<User>;
    declare artist?: NonAttribute<Album>;

    static initModel(sequelize: sequelize) {
        this.init({...this.baseInitConfig,
            albumId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: Album,
                    key: 'id',
                }
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: User,
                    key: 'id',
                }
            }
        }, this.getBaseOptions(sequelize, 'FavoriteAlbum'));
    }

    static associate(){
        FavoriteAlbum.belongsTo(User, {foreignKey: 'userId', as: 'user'});
        FavoriteAlbum.belongsTo(Album, {foreignKey: 'albumId', as: 'album'});
    }
}