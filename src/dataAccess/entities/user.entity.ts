import {BaseEntity} from "./base.entity";

export interface UserEntity extends BaseEntity {
    login: string;
    password: string;
}