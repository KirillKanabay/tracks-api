import {BaseEntity} from "../../dataAccess/entities/base.entity";

export interface ArtistEntity extends BaseEntity {
    name: string;
    grammy: boolean;
}