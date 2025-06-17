import type { Task } from "../Objects/Task";
import type { CrudRemoteService } from "./CrudRemoteService";
import { AxiosCrudService } from "./AxiosCrudService";

class TaskService{
    crudService : CrudRemoteService<Task>;

    constructor(endPpoint : string){
        // could change to other implementation of CrudRemoteServices
        this.crudService = new AxiosCrudService<Task>(endPpoint);
    }

    getAllTasks(): Promise<Task[]> {
        return this.crudService.getAll();
    }

    getTaskById(id: string): Promise<Task> {
        return this.crudService.getById(id);
    }

    createTask(task: Task): Promise<Task> {
        return this.crudService.create(task);
    }

    updateTask(id: string, updates: Partial<Task>): Promise<Task> {
        return this.crudService.update(id, updates);
    }

    deleteTask(id: string): Promise<void> {
        return this.crudService.delete(id);
    }
}