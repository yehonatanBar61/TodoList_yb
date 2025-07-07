import Consts from "../../Client/Consts";
import { TaskService } from "../../Client/TasksService";
import type { Task } from "../../Objects/Task";
import { Filtering } from "./Filtering";
import { FilterRepository } from "./FilterRepository";
import { makeAutoObservable, observable } from "mobx";

export default class TaskStore {
    allTasks: Task[] = [];
    filtering = new Filtering(FilterRepository);
    crud = new TaskService(Consts.REMOTE_HOST_URI);

  constructor() {
    makeAutoObservable(this, {
      filtering: observable.ref,
    });
  }

  get tasks() : Task[]{
    return this.allTasks;
  }

  setTasks(tasks : Task[]){
    this.allTasks = tasks;
  }

  addTask(task: Task){
    this.allTasks.push(task);
  }

  async loadTasks() {
    const tasks = await this.crud.getAllTasks();
    this.allTasks = tasks;
  }

  get Filtering(): Filtering{
    return this.filtering;
  }

  get filteredTasks(): Task[]{
    return this.filtering.applyFilters(this.allTasks);
  }
}