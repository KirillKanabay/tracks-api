import {BaseEntity} from "../../dataAccess/entities/base.entity";

export interface FavoriteArtistEntity extends BaseEntity{
    userId: string;
    artistId: string;
}