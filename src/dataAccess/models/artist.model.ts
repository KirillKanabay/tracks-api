import {DataTypes, NonAttribute} from "sequelize";
import {ArtistEntity} from "../../artists/entities/artist.entity";
import sequelize from 'sequelize/types/sequelize';
import {BaseModel} from "./base.model";
import {Album} from "./album.model";
import {Track} from "./track.model";

export class Artist extends BaseModel<Artist> implements ArtistEntity {
    declare name: string;
    declare grammy: boolean;

    declare albums?: NonAttribute<Album[]>
    declare tracks?: NonAttribute<Track[]>

    static initModel(sequelize: sequelize){
        this.init({...this.baseInitConfig,
            name: { type: DataTypes.STRING, allowNull: false },
            grammy:{ type: DataTypes.BOOLEAN, allowNull: false }
        }, this.getBaseOptions(sequelize, 'Artist'));

        Artist.beforeCreate(this.beforeCreateHandler);
        Artist.beforeUpdate(this.beforeUpdateHandler);

        Artist.hasMany(Album);
        Artist.hasMany(Track);
    };
}