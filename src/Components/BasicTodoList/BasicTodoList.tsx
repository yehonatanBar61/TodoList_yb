import * as React from 'react';
import List from '@mui/material/List';
import '../../Style/BasicTodoList/BasicTodoList.css';
import { TaskService } from '../../Client/TasksService';
import type { Task } from '../../Objects/Task';
import BasicTodoItem from './BasicTodoItem';
import BasicAddTaskItem from './BasicAddTaskItem';
import { useAlert } from '../Notifications/UseAlert';
import { useState } from 'react';
import { Filtering } from '../../Logic/TaskFiltering/Filtering';
import { FilterRepository } from '../../Logic/TaskFiltering/FilterRepository'
import Consts from "../../Client/Consts";
import ListController from './ListController';


const crud = new TaskService(Consts.REMOTE_HOST_URI);
const taskFiltering = new Filtering(FilterRepository);

export default function BasicRowList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [tabValue, setTabValue] = useState(0);

  const { showAlert } = useAlert();

  React.useEffect(() => {
    crud.getAllTasks()
      .then(setTasks)
      .catch(() => showAlert("error", "Failed to load tasks"));
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
      showAlert("success", "Task updated");
    } else {
      showAlert("error", "Failed to update task");
    }
  }

  const onDeleteAction = async (id : string) => {
    const result: boolean = await crud.deleteTask(id);
    if (result) {
      showAlert('success', 'Task deletion succeeded');
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    } else {
      showAlert('error', 'Task deletion failed');
    }
  }

  const onEditTask = async (id: string, title: string, desc: string) => {
    const result: Task = await crud.updateTask(id, {
      id,
      title,
      description: desc,
    });
    if(result.id.length === 0){
      showAlert('error', 'Could not update Task')
    }else{
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? result : task
        )
      );
      showAlert('success', 'Updated Task successfuly');
    }
  }

  const addTask = async (task : Task) => {
    const result : Task = await crud.createTask(task);
    if(result.id.length !== 0){
      showAlert("success", "Adding task completed");
      setTasks([...tasks, task]);
    }else {
      showAlert("error", "Adding task Failed");
    }
  }

  const deleteAllTasks = async () => {
    let succeeded = true;
    let updatedTasks = [...tasks];

    for (const taskToDelete of tasks) {
      const result = await crud.deleteTask(taskToDelete.id);
      if (!result) {
        succeeded = false;
      }
      updatedTasks = updatedTasks.filter(task => task.id !== taskToDelete.id);
    }

    setTasks(updatedTasks);

    if (!succeeded) {
      showAlert("error", "Failed to delete all Tasks");
    } else {
      showAlert("success", "Deletion succeeded");
    }
  };

    return (
      <section className='list-container'>
        <div className="content-headline">
          <h3>Tasks</h3>
        </div>

        <ListController 
          deleteAllTasks={deleteAllTasks}
          tabValue={tabValue}
          setTabValue={setTabValue}
          taskFiltering={taskFiltering}
          setFilteredTasks={setFilteredTasks}
          tasks={tasks}
          />

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
