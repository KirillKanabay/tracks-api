import {BaseEntity} from "../dataAccess/entities/base.entity";

export interface AlbumEntity extends BaseEntity {
    name: string;
    year: number;
    artistId: string | null;
}