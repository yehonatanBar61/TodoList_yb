import Consts from "../../Client/Consts";
import { TaskService } from "../../Client/TasksService";
import type { Task } from "../../Objects/Task";
import { Filtering } from "./Filtering";
import { FilterRepository } from "./FilterRepository";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

export default class TaskStore {
    tasks: Task[] = [];

    filtering = new Filtering(FilterRepository);
    crud = new TaskService(Consts.REMOTE_HOST_URI);

  constructor() {
    makeAutoObservable(this, {
      filtering: false
    });
  }

  getTasks() : Task[]{
    return this.tasks;
  }

  setTasks(tasks : Task[]){
    this.tasks = tasks;
  }

  

  async loadTasks() {
    const tasks = await this.crud.getAllTasks();
    this.tasks = tasks;
  }

}