import {BaseEntity} from "../../dataAccess/entities/base.entity";

export interface UserEntity extends BaseEntity {
    login: string;
    password: string;
    refreshToken?: string;
}