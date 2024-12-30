import {BaseEntity} from "../../dataAccess/entities/base.entity";

export interface TrackEntity extends BaseEntity {
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
}