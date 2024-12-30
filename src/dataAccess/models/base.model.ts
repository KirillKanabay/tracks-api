import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import {BaseEntity} from "../entities/base.entity";
import sequelize from "sequelize/types/sequelize";

export abstract class BaseModel<TModel extends Model<any, any>>
    extends Model<InferAttributes<TModel>, InferCreationAttributes<TModel>>
    implements BaseEntity{
    declare id: CreationOptional<string>;
    declare createdAt: CreationOptional<number>;
    declare updatedAt: CreationOptional<number>;
    declare version: CreationOptional<number>;

    protected static get baseInitConfig(){
        return {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
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
        }
    }

    protected static getBaseOptions(sequelize: sequelize, tableName: string){
        return {
            sequelize,
            tableName: tableName,
            version: true,
            timestamps: false,
        }
    }

    protected static beforeUpdateHandler(instance: BaseModel<any>){
        instance.updatedAt = Date.now();
    }

    protected static beforeCreateHandler(instance: BaseModel<any>){
        instance.createdAt = Date.now();
    }

//     Artist.beforeCreate((artist) => {
//     artist.createdAt = Date.now();
// });
//
// Artist.beforeUpdate((artist) => {
//     artist.updatedAt = Date.now();
// });
}
