import type { Filter } from './Filtering';
import type { Task } from '../../Objects/Task';

export let FilterRepository = new Map<string, Filter>([
  ["Completed", {
    name: "Completed",
    operator: (tasks: Task[]) => tasks.filter(t => t.completed),
  }],
  ["Uncompleted", {
    name: "Uncompleted",
    operator: (tasks: Task[]) => tasks.filter(t => !t.completed),
  }]
]);