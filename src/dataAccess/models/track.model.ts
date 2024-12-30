import {BaseModel} from "./base.model";
import {TrackEntity} from "../../tracks/entities/track.entity";
import {CreationOptional, DataTypes, NonAttribute} from "sequelize";
import sequelize from 'sequelize/types/sequelize';
import {Artist} from "./artist.model";
import {Album} from "./album.model";

export class Track extends BaseModel<Track> implements TrackEntity{
    declare name: string;
    declare artistId: CreationOptional<string>;
    declare albumId: CreationOptional<string>;
    declare duration: number;

    declare artist?: NonAttribute<Artist>
    declare album?: NonAttribute<Album>

    static initModel(sequelize: sequelize){
        this.init({...this.baseInitConfig,
            name: { type: DataTypes.STRING, allowNull: false },
            duration:{ type: DataTypes.INTEGER, allowNull: false },
            albumId: {
                type: DataTypes.STRING,
                allowNull: true,
                references: {
                    model: Album,
                    key: 'id',
                }
            },
            artistId: {
                type: DataTypes.STRING,
                allowNull: true,
                references: {
                    model: Artist,
                    key: 'id',
                }
            },
        }, this.getBaseOptions(sequelize, 'Track'));

        Track.beforeCreate(this.beforeCreateHandler);
        Track.beforeUpdate(this.beforeUpdateHandler);

        Track.belongsTo(Artist, {foreignKey: 'artistId', as: 'artist'});
        Track.belongsTo(Album, {foreignKey: 'albumId', as: 'album'});
    };
}