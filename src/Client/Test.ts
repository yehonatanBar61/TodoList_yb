// src/Client/Test.ts
import { TaskService } from './TasksService';
import type { Task } from '../Objects/Task';

const taskService = new TaskService('http://localhost:8080/todos');

export async function seedInitialTasks() {
  const initialTasks: Task[] = [
    {
      id: '1',
      title: 'Buy groceries',
      description: 'Milk, eggs, bread',
      completed: false
    },
    {
      id: '2',
      title: 'Call the bank',
      description: 'Ask about credit limit',
      completed: false
    },
    {
      id: '3',
      title: 'Finish homework',
      description: 'Algorithms and data structures',
      completed: false
    }
  ];

  for (const task of initialTasks) {
    await taskService.createTask(task);
  }

  console.log('Seeded 3 tasks!');
}