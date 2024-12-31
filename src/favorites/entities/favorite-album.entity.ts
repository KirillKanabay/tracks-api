import {BaseEntity} from "../../dataAccess/entities/base.entity";

export interface FavoriteAlbumEntity extends BaseEntity {
    userId: string;
    albumId: string;
}