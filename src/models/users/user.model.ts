import {CreationOptional, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<string>;
    declare login: string;
    declare password: string;
    declare version: CreationOptional<number>;
    declare createdAt: CreationOptional<number>;
    declare updatedAt: CreationOptional<number>;
}