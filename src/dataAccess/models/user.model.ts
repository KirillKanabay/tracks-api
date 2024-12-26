import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import sequelize from 'sequelize/types/sequelize';
import {UserEntity} from "../../users/entities/user.entity";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements UserEntity{
    declare id: CreationOptional<string>;
    declare login: string;
    declare refreshToken: CreationOptional<string>;
    declare password: string;
    declare version: CreationOptional<number>;
    declare createdAt: CreationOptional<number>;
    declare updatedAt: CreationOptional<number>;

    static initModel(sequelize: sequelize){
        this.init({
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            version: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            createdAt: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.BIGINT,
                allowNull: true,
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: true,
            }},
            {
                sequelize,
                tableName: 'User',
                version: true,
                timestamps: false,
            });

        User.beforeCreate((user) => {
            user.createdAt = Date.now();
        });

        User.beforeUpdate((user) => {
            user.updatedAt = Date.now();
        });
    };
}