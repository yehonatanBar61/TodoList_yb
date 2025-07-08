import { TextField, Button } from "@mui/material";
import type { Task } from "../../Objects/Task";
import GenericDialog from "./GenericDialog";

    type Props = {
        openEdit : boolean;
        todo : Task;
        title : string;
        setTitle : (newTitle: string) => void;
        description : string;
        setDescription : (newDescription : string) => void;
        onEditTask: (id: string, title: string, desc: string) => void;
        handleEditTaskClose : () => void;
    }

export default function EditTaskDialog({
    openEdit,
    todo,
    title,
    setTitle,
    description,
    setDescription,
    onEditTask,
    handleEditTaskClose
    }: Props) {

    const onSubmitEditTask = () => {
        onEditTask(todo.id, title, description);
        handleEditTaskClose();
    };

    return (
        <GenericDialog
        open={openEdit}
        title="Edit Task"
        onClose={handleEditTaskClose}
        actions={
            <>
            <Button onClick={handleEditTaskClose} sx={{ color: "#0A9528" }}>Cancel</Button>
            <Button onClick={onSubmitEditTask} sx={{ color: "#0A9528" }}>Submit</Button>
            </>
        }
        >
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
        </GenericDialog>
    );
}