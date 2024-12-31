import {BaseModel} from "./base.model";
import {FavoriteArtistEntity} from "../../favorites/entities/favorite-artist.entity";
import {DataTypes, ForeignKey, NonAttribute} from "sequelize";
import {User} from "./user.model";
import {Artist} from "./artist.model";
import sequelize from "sequelize/types/sequelize";
import {Album} from "./album.model";

export class FavoriteArtist extends BaseModel<FavoriteArtist> implements FavoriteArtistEntity{
    declare userId: ForeignKey<User['id']>;
    declare artistId: ForeignKey<Artist['id']>;

    declare user?: NonAttribute<User>;
    declare album?: NonAttribute<Album>;

    static initModel(sequelize: sequelize) {
        this.init({...this.baseInitConfig,
            artistId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: Artist,
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
        }, this.getBaseOptions(sequelize, 'FavoriteArtist'));
    }

    static associate(){
        FavoriteArtist.belongsTo(User, {foreignKey: 'userId', as: 'user'});
        FavoriteArtist.belongsTo(Artist, {foreignKey: 'artistId', as: 'artist'});
    }
}