import { Box, Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, styled, TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";
import type { Task } from "../../Objects/Task";
import TitleInputDialog from "../Dialogs/TitleInputDialog";
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import { useAlert } from "../Notifications/UseAlert";

const isElectron = import.meta.env.VITE_IS_ELECTRON === 'true';

export const StyledListItem = styled(ListItem)(({ theme }) =>
  isElectron
    ? {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '12px',
        marginBottom: '8px',
        padding: '8px 12px',
        color: theme.palette.text.primary,
      }
    : {}
);

export const StyledListItemButton = styled(ListItemButton)(({ theme }) =>
  isElectron
    ? {
        borderRadius: '12px',
        overflow: 'hidden',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        color: theme.palette.text.primary,
      }
    : {}
);

export default function BasicAddTaskItem({addTask} : {addTask : (task : Task) => void}) {

  const isSmall = useMediaQuery('(max-width:1025px)');
  
  const [description, setDescription] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState('');

  const { showAlert } = useAlert();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if(description.trim()){
        setOpenDialog(true);
      }
    }
  };

  const confirmAddTask = () => {
    const newTask: Task = {
      id: uuidv4(), // todo: change to -1
      title: title.trim(),
      description: description.trim(),
      completed : false
    };

    if(newTask.title.length === 0){
      showAlert("error", "Empty title is not allowd");
    }else{
      addTask(newTask);
    }

    setDescription('');
    setTitle('');
    setOpenDialog(false);
  };

  return (
    <StyledListItem 
      disablePadding
      divider
      sx={{ alignItems: 'flex-start' }}
    >
      <ListItemIcon>
      <Checkbox
        edge="start"
        tabIndex={-1} 
        sx={{
          '&.Mui-disabled': {
            color: "#497053",
          },
        }}
        disabled
      />
      </ListItemIcon>
      <StyledListItemButton role={undefined} dense>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <TextField className="addTask-txt-field"
            fullWidth
            multiline
            maxRows={5}
            minRows={1}
            placeholder={isSmall ? "Add description..." : "Add a new task description..."}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="standard"
            inputProps={{ maxLength: 483 }}
          />
            <IconButton
              onClick={() => description.trim() && setOpenDialog(true)}
              sx={{ color: 'green' }}
              aria-label="add"
            >
              <AddIcon />
            </IconButton>
        </Box>
      </StyledListItemButton>
      <TitleInputDialog
          open={openDialog}
          title={title}
          onTitleChange={setTitle}
          onCancel={() => setOpenDialog(false)}
          onConfirm={confirmAddTask}
      />
    </StyledListItem>
  );
}

