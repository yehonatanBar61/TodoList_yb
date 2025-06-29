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
            </>
        )
    }