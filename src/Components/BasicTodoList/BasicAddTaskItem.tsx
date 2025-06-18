import { Button, Checkbox, ListItem, TextField } from "@mui/material";
import { useState } from "react";
import type { Task } from "../../Objects/Task";
import TitleInputDialog from "../Dialogs/TitleInputDialog";
import { v4 as uuidv4 } from 'uuid';

export default function BasicAddTaskItem({addTask} : {addTask : (task : Task) => () => void}) {
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && description.trim()) {
      setOpen(true);
    }
  };

  const confirmAddTask = () => {
    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      completed : false
    };

    addTask(newTask)();
    setDescription('');
    setTitle('');
    setOpen(false);
  };

  return (
    <ListItem disablePadding>
        <Checkbox
            edge="start"
            tabIndex={-1}
            disabled
        />
        <TextField
          fullWidth
          multiline
          maxRows={6}
          minRows={1}
          placeholder="Add a new task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="standard"
          InputProps={{
            sx: {
              fontSize: '0.95rem',
              lineHeight: 1.5,
              padding: 0,
            }
          }}
        />
        <Button 
          variant="outlined"
          onClick={() => setOpen(true)}
        >OK</Button>

        <TitleInputDialog
          open={open}
          title={title}
          onTitleChange={setTitle}
          onCancel={() => setOpen(false)}
          onConfirm={confirmAddTask}
        />
    </ListItem>
  );
}

