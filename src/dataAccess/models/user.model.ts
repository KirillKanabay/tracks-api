import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from 'sequelize';
import sequelize from 'sequelize/types/sequelize';

export interface UserEntity{
    id?: string;
    login: string;
    password: string;
    version: number;
    createdAt: number;
    updatedAt: number;
}

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>
    implements UserEntity{

    declare id: CreationOptional<string>;
    declare login: string;
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
            }},
            {
                sequelize,
                tableName: 'User',
                version: true,
                timestamps: false,
            });

        User.beforeCreate((user, options) => {
            user.createdAt = Date.now();
        });

        User.beforeUpdate((user, options) => {
            user.updatedAt = Date.now();
        });
    };
}