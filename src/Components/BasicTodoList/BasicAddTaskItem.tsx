import { Box, Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, TextField } from "@mui/material";
import { useState } from "react";
import type { Task } from "../../Objects/Task";
import TitleInputDialog from "../Dialogs/TitleInputDialog";
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import { useAlert } from "../Notifications/UseAlert";


export default function BasicAddTaskItem({addTask} : {addTask : (task : Task) => void}) {
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
    <ListItem 
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
      <ListItemButton role={undefined} dense>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <TextField className="addTask-txt-field"
            fullWidth
            multiline
            maxRows={6}
            minRows={1}
            placeholder="Add a new task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="standard"
          />
            <IconButton
              onClick={() => description.trim() && setOpenDialog(true)}
              sx={{ color: 'green' }}
              aria-label="add"
            >
              <AddIcon />
            </IconButton>
        </Box>
      </ListItemButton>
      <TitleInputDialog
          open={openDialog}
          title={title}
          onTitleChange={setTitle}
          onCancel={() => setOpenDialog(false)}
          onConfirm={confirmAddTask}
      />
    </ListItem>
  );
}

