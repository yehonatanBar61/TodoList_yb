export interface CrudRemoteService<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}