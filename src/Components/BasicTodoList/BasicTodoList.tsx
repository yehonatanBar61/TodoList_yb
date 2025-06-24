import * as React from 'react';
import List from '@mui/material/List';
import '../../Style/BasicTodoList/BasicTodoList.css';
import { TaskService } from '../../Client/TasksService';
import type { Task } from '../../Objects/Task';
import BasicTodoItem from './BasicTodoItem';
import BasicAddTaskItem from './BasicAddTaskItem';
import { useAlert } from '../Notifications/UseAlert';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Filtering } from '../../Logic/TaskFiltering/Filtering';
import { FilterRepository } from '../../Logic/TaskFiltering/FilterRepository'

const crud = new TaskService("http://localhost:8080/todos"); //todo : move to consts / vars file
const taskFiltering = new Filtering(FilterRepository);

export default function BasicRowList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const { showAlert } = useAlert();

  React.useEffect(() => {
    crud.getAllTasks()
      .then(setTasks)
      .catch(() => showAlert("Error", "Failed to load tasks"));
  }, []);

  React.useEffect(() => {
    setFilteredTasks(taskFiltering.applyFilters(tasks));
  }, [tasks]);

  const toggleTaskComplition = async (taskId: string) : Promise<void> => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedCompleted = !task.completed;

    const result = await crud.updateTask(taskId, { completed: updatedCompleted });

    if (result.id === taskId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, completed: updatedCompleted } : task
        )
      );
      showAlert("Success", "Task updated");
    } else {
      showAlert("Error", "Failed to update task");
    }
  }

  const onDeleteAction = async (id : string) => {
    const result: boolean = await crud.deleteTask(id);
    if (result) {
      showAlert('Success', 'Task deletion succeeded');
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    } else {
      showAlert('Error', 'Task deletion failed');
    }
  }

  const onEditTask = async (id: string, title: string, desc: string) => {
    const result: Task = await crud.updateTask(id, {
      id,
      title,
      description: desc,
    });
    if(result.id.length === 0){
      showAlert('Error', 'Could not update Task')
    }else{
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? result : task
        )
      );
      showAlert('Success', 'Updated Task successfuly');
    }
  }

  const addTask = (task : Task) => () => {
    crud.createTask(task);
    setTasks([...tasks, task]);
  }

  return (
    <section className='list-container'>
      <div className="content-headline">
        <h3>Tasks</h3>
      </div>
      <div className="list-controll-pannel">
        <ButtonGroup className='button-group-filter' variant="contained" aria-label="Basic button group">
          <Button onClick={() => {
            taskFiltering.clearFilters();
            setFilteredTasks(tasks);
          }}>All</Button>
          <Button onClick={() => {
            taskFiltering.setFilters(["Completed"]);
            setFilteredTasks(taskFiltering.applyFilters(tasks));
          }}>Completed</Button>
          <Button onClick={() => {
            taskFiltering.setFilters(["Uncompleted"]);
            setFilteredTasks(taskFiltering.applyFilters(tasks));
          }}>Not completed</Button>
        </ButtonGroup>
      </div>
      <List className='task-list'>
        {filteredTasks.map((task) => {
          return (
            <BasicTodoItem todo={task} toggle={toggleTaskComplition} onDeleteAction={onDeleteAction} onEditTask={onEditTask}/>
          );
        })}
        <BasicAddTaskItem addTask={addTask}/>
      </List>
    </section>
  );
}
