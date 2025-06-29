import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  styled,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import type { Task } from "../../Objects/Task";
import { Edit } from "@mui/icons-material";
import EditTask from "../Dialogs/EditTask";

  type props = {
    todo: Task;
    toggle: (id: string) => void;
    onDeleteAction: (id: string) => void;
    onEditTask: (id: string, title: string, desc: string) => void;
  }

  const TaskCheckBox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.primary.main,
    '&.Mui-checked': {
      color: theme.palette.secondary.main,
    },
  }));

  export default function BasicTodoItem({
    todo,
    toggle,
    onDeleteAction,
    onEditTask,
  }: props) { 
    const [openDescription, setOpenDescription] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const labelId = `checkbox-list-label-${todo.id}`;

    const handleOpen = () => setOpenDescription(true);
    const handleClose = () => setOpenDescription(false);

    const handleEditTaskPressed = () => setOpenEdit(true);
    const handleEditTaskClose = () => setOpenEdit(false);

    return (
      <>
        <ListItem
          key={todo.id}
          disablePadding
          divider
          secondaryAction={
            <div>
              <IconButton
                aria-label="delete"
                onClick={handleEditTaskPressed}
              >
              <Edit fontSize="inherit" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => onDeleteAction(todo.id)}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>
          }
        >
          <ListItemIcon>
            <TaskCheckBox
              className="taskCheckBox"
              edge="start"
              checked={todo.completed}
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                toggle(todo.id);
              }}
            />
            </ListItemIcon>
          <ListItemButton role={undefined} dense onClick={handleOpen}>
            <ListItemText id={labelId} primary={title} />
          </ListItemButton>
        </ListItem>

        <EditTask
          openEdit={openEdit}
          todo={todo}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onEditTask={onEditTask}
          handleEditTaskClose={handleEditTaskClose}
        />

        <Dialog open={openDescription} onClose={handleClose}>
          <DialogTitle>Task Description</DialogTitle>
          <DialogContent>
            <DialogContentText>{description || "No description provided."}</DialogContentText>
          </DialogContent>
        </Dialog>
      </>
    );
  }
