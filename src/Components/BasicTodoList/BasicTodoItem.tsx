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
  Button,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import type { Task } from "../../Objects/Task";
import { Edit } from "@mui/icons-material";

export default function BasicTodoItem({
  todo,
  toggle,
  onDeleteAction,
  onEditTask,
}: {
  todo: Task;
  toggle: (id: string) => void;
  onDeleteAction: (id: string) => void;
  onEditTask: (id: string, title: string, desc: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const labelId = `checkbox-list-label-${todo.id}`;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditTaskPressed = () => setOpenEdit(true);
  const handleEditTaskClose = () => setOpenEdit(false);

  const onSubmitEditTask = () => {
    onEditTask(todo.id, title, description);
    handleEditTaskClose();
  }

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
            <Checkbox
              edge="start"
              checked={todo.completed}
              tabIndex={-1}
              disableRipple
              onClick={(e) => {
                e.stopPropagation();
                toggle(todo.id);
              }}
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
        <ListItemButton role={undefined} dense onClick={handleOpen}>
          <ListItemText id={labelId} primary={todo.title} />
        </ListItemButton>
      </ListItem>

      <Dialog
        open={openEdit}
        onClose={handleEditTaskClose}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="task-title"
            name="title"
            label="Task title"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="task-description"
            name="description"
            label="Task description"
            fullWidth
            variant="standard"
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditTaskClose}>Cancel</Button>
          <Button onClick={onSubmitEditTask}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Task Description</DialogTitle>
        <DialogContent>
          <DialogContentText>{todo.description || "No description provided."}</DialogContentText>
        </DialogContent>

      </Dialog>
    </>
  );
}
