export interface IRepository<T>{
    get(id: string): Promise<T | null>;
    getAll(): Promise<T[]>;
    add(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    delete(id: string): Promise<void>;
}

export interface EntityBase {
    id: string;
}