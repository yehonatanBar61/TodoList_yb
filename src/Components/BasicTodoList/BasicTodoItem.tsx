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
  DialogContentText
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import type { Task } from "../../Objects/Task";

export default function BasicTodoItem({
  todo,
  toggle,
  checked,
  onDeleteAction
}: {
  todo: Task;
  toggle: (id: string) => () => void;
  checked: string[];
  onDeleteAction: (id: string) => () => void;
}) {
  const [open, setOpen] = useState(false);
  const labelId = `checkbox-list-label-${todo.id}`;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ListItem
        key={todo.id}
        disablePadding
        secondaryAction={
          <IconButton
            aria-label="delete"
            size="small"
            onClick={onDeleteAction(todo.id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <ListItemButton role={undefined} dense onClick={handleOpen}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.includes(todo.id)}
              tabIndex={-1}
              disableRipple
              onClick={(e) => {
                e.stopPropagation(); // prevents opening the dialog when checking
                toggle(todo.id)();
              }}
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={todo.title} />
        </ListItemButton>
      </ListItem>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Task Description</DialogTitle>
        <DialogContent>
          <DialogContentText>{todo.description || "No description provided."}</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
