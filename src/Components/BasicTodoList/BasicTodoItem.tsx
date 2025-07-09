import {
  Checkbox,
  IconButton,
  ListItemIcon,
  ListItemText,
  DialogContentText,
  styled,
  Button,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import type { Task } from "../../Objects/Task";
import { Edit } from "@mui/icons-material";
import EditTaskDialog from "../Dialogs/EditTaskDialog";
import GenericDialog from "../Dialogs/GenericDialog";
import { StyledListItem, StyledListItemButton } from "./BasicAddTaskItem";

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
    const [openConfirmDetele, setOpenConfirmDelete] = useState(false);

    const labelId = `checkbox-list-label-${todo.id}`;

    const handleOpen = () => setOpenDescription(true);
    const handleClose = () => setOpenDescription(false);

    const handleEditTaskPressed = () => setOpenEdit(true);
    const handleEditTaskClose = () => setOpenEdit(false);

    return (
      <>
        <StyledListItem
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
                onClick={() => setOpenConfirmDelete(true)}
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
          <StyledListItemButton role={undefined} dense onClick={handleOpen}>
            <ListItemText id={labelId} primary={title} />
          </StyledListItemButton>
        </StyledListItem>

        <EditTaskDialog
          openEdit={openEdit}
          todo={todo}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onEditTask={onEditTask}
          handleEditTaskClose={handleEditTaskClose}
        />

        <GenericDialog
          open={openDescription}
          title="Task Description"
          onClose={handleClose}
        >
          <DialogContentText>
            {description || "No description provided."}
          </DialogContentText>
        </GenericDialog>

        <GenericDialog
          open={openConfirmDetele}
          title="Delete Task"
          onClose={() => setOpenConfirmDelete(false)}
          actions={
            <>
              <Button sx={{ color: "#0A9528" }} onClick={() => setOpenConfirmDelete(false)}>
                Cancel
              </Button>
              <Button
                sx={{ color: "#0A9528" }}
                onClick={() => {
                  onDeleteAction(todo.id);
                  setOpenConfirmDelete(false);
                }}
              >
                Confirm
              </Button>
            </>
          }
        >
          <DialogContentText>
            Are you sure you want to delete the task?
          </DialogContentText>
        </GenericDialog>

      </>
    );
  }
