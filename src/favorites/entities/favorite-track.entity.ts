import {BaseEntity} from "../../dataAccess/entities/base.entity";

export interface FavoriteTrackEntity extends BaseEntity {
    userId: string;
    trackId: string;
}