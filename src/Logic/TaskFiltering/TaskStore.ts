import Consts from "../../Client/Consts";
import { TaskService } from "../../Client/TasksService";
import type { Task } from "../../Objects/Task";
import { Filtering } from "./Filtering";
import { FilterRepository } from "./FilterRepository";
import { makeAutoObservable } from "mobx";


export class TaskStore {
    tasks: Task[] = [];
    tabValue = 0;
    searchText = "";

    filtering = new Filtering(FilterRepository);
    crud = new TaskService(Consts.REMOTE_HOST_URI);

    
  constructor() {
    makeAutoObservable(this, {
      filtering: false
    });
  }

  async loadTasks() {
    const tasks = await this.crud.getAllTasks();
    this.tasks = tasks;
  }

    setTabValue(value: number) {
        this.tabValue = value;
        this.applyTabFilter();
    }

    applyTabFilter() {
        if (this.tabValue === 0) {
            this.filtering.clearFilters();
        } else if (this.tabValue === 1) {
            this.filtering.setFilters(["Completed"]);
        } else if (this.tabValue === 2) {
            this.filtering.setFilters(["Uncompleted"]);
        }
    }

}