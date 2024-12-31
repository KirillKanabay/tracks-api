import {BaseModel} from "./base.model";
import {AlbumEntity} from "../../albums/entities/album.entity";
import {DataTypes, ForeignKey, NonAttribute} from "sequelize";
import sequelize from 'sequelize/types/sequelize';
import {Artist} from "./artist.model";

export class Album extends BaseModel<Album> implements AlbumEntity{
    declare name: string;
    declare year: number;
    declare artistId: ForeignKey<Artist['id']>;

    declare artist?: NonAttribute<Artist>

    static initModel(sequelize: sequelize){
        this.init({...this.baseInitConfig,
            name: { type: DataTypes.STRING, allowNull: false },
            year:{ type: DataTypes.INTEGER, allowNull: false },
            artistId: {
                type: DataTypes.STRING,
                allowNull: true,
                references: {
                    model: Artist,
                    key: 'id'
                }
            }
        }, this.getBaseOptions(sequelize, 'Album'));

        Album.beforeCreate(this.beforeCreateHandler);
        Album.beforeUpdate(this.beforeUpdateHandler);
    };

    static associate(){
        Album.belongsTo(Artist, {foreignKey: 'artistId', as: 'artist'});
    }
}