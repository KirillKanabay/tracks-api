import {BaseModel} from "./base.model";
import {DataTypes, ForeignKey, NonAttribute} from "sequelize";
import {User} from "./user.model";
import {Album} from "./album.model";
import sequelize from "sequelize/types/sequelize";
import {FavoriteTrackEntity} from "../../favorites/entities/favorite-track.entity";
import {Track} from "./track.model";

export class FavoriteTrack extends BaseModel<FavoriteTrack> implements FavoriteTrackEntity{
    declare userId: ForeignKey<User['id']>;
    declare trackId: ForeignKey<Track['id']>;

    declare user?: NonAttribute<User>;
    declare track?: NonAttribute<Track>;

    static initModel(sequelize: sequelize) {
        this.init({...this.baseInitConfig,
            trackId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: Track,
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
        }, this.getBaseOptions(sequelize, 'FavoriteTrack'));
    }

    static associate(){
        FavoriteTrack.belongsTo(User, {foreignKey: 'userId', as: 'user'});
        FavoriteTrack.belongsTo(Album, {foreignKey: 'trackId', as: 'track'});
    }
}