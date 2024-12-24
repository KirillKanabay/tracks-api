import {IRepository, EntityBase} from "./repository.types";

export abstract class InMemoryRepository<T extends EntityBase> implements IRepository<T> {
    protected data: T[];

    constructor() {
        this.data = [];
    }

    get(id: string): Promise<T | null> {
        return Promise.resolve(this.data.find(e => e.id === id) ?? null);
    }

    getAll(): Promise<T[]> {
        return Promise.resolve(this.data);
    }

    add(entity: T): Promise<void> {
        this.data.push(entity)
        return Promise.resolve();
    }

    update(entity: T): Promise<void> {
        this.data = this.data.filter(e => e.id !== entity.id);
        this.data.push(entity);
        return Promise.resolve();
    }

    delete(id: string): Promise<void> {
        this.data = this.data.filter(e => e.id !== id);
        return Promise.resolve();
    }
}