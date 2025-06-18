import * as React from 'react';
import List from '@mui/material/List';
import '../../Style/BasicRowList.css'
import { TaskService } from '../../Client/TasksService';
import type { Task } from '../../Objects/Task';
import BasicTodoItem from './BasicTodoItem';
import BasicAddTaskItem from './BasicAddTaskItem';

const crud = new TaskService("http://localhost:8080/todos"); //todo : move to consts / vars file

export default function BasicRowList() {
  const [checked, setChecked] = React.useState<string[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    crud.getAllTasks()
      .then(setTasks)
      .catch((err) => console.error("Failed to load tasks:", err));
  }, []);

  const handleToggle = (taskId: string) => () => {
    const currentIndex = checked.indexOf(taskId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(taskId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const onDeleteAction = (id : string) => () => {
    crud.deleteTask(id);
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  
  const addTask = (task : Task) => () => {
    crud.createTask(task);
    setTasks([...tasks, task]);
  }

  return (
    <section className='list-container'>
      <List className='task-list'>
        {tasks.map((task) => {
          return (
            <BasicTodoItem todo={task} toggle={handleToggle} checked={checked} onDeleteAction={onDeleteAction}/>
          );
        })}
        <BasicAddTaskItem addTask={addTask}/>
      </List>
    </section>
  );
}