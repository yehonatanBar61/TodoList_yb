import type { Filter } from './Filtering';
import type { Task } from '../../Objects/Task';

export let FilterRepository = new Map<string, Filter>([
  ["Completed", {
    name: "Completed",
    operator: (tasks: Task[]) => tasks.filter(task => task.completed),
  }],
  ["Uncompleted", {
    name: "Uncompleted",
    operator: (tasks: Task[]) => tasks.filter(task => !task.completed),
  }],
]);