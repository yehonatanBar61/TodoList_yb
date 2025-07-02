import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import type { Task } from "../../Objects/Task";

    type props = {
        openEdit : boolean;
        todo : Task;
        title : string;
        setTitle : (newTitle: string) => void;
        description : string;
        setDescription : (newDescription : string) => void;
        onEditTask: (id: string, title: string, desc: string) => void;
        handleEditTaskClose : () => void;
    }

    export default function EditTask({
        openEdit,
        todo,
        title,
        setTitle,
        description,
        setDescription,
        onEditTask,
        handleEditTaskClose,
        } : props) {

        const onSubmitEditTask = () => {
            onEditTask(todo.id, title, description);
            handleEditTaskClose();
        }

        return (
            <>
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
                        inputProps={{ maxLength: 20 }}
                        value={title}
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
                        inputProps={{ maxLength: 483 }}
                        value={description}
                    />
                    </DialogContent>
                        <DialogActions>
                        <Button onClick={handleEditTaskClose} sx={{color: '#0A9528'}}>Cancel</Button>
                        <Button onClick={onSubmitEditTask} sx={{color: '#0A9528'}}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }