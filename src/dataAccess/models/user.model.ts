import { CreationOptional, DataTypes } from 'sequelize';
import sequelize from 'sequelize/types/sequelize';
import {UserEntity} from "../../users/entities/user.entity";
import {BaseModel} from "./base.model";

export class User extends BaseModel<User> implements UserEntity{
    declare login: string;
    declare refreshToken: CreationOptional<string>;
    declare password: string;

    static initModel(sequelize: sequelize){
        this.init({...this.baseInitConfig,
            login: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: { type: DataTypes.STRING, allowNull: false },
            refreshToken: { type: DataTypes.STRING, allowNull: true,}
        }, this.getBaseOptions(sequelize, 'User'));

        User.beforeCreate(this.beforeCreateHandler);
        User.beforeUpdate(this.beforeUpdateHandler);
    };
}