import { FilterName, type Filter } from './Filtering';
import type { Task } from '../../Objects/Task';

export let FilterRepository = new Map<string, Filter>([
  [FilterName.Completed, {
    name: FilterName.Completed,
    operator: (tasks: Task[]) => tasks.filter(task => task.completed),
  }],
  [FilterName.Uncompleted, {
    name: FilterName.Uncompleted,
    operator: (tasks: Task[]) => tasks.filter(task => !task.completed),
  }],
]);