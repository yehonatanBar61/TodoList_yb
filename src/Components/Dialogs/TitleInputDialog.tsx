import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import GenericDialog from './GenericDialog';

type Props = {
  open: boolean;
  title: string;
  onTitleChange: (newTitle: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function TitleInputDialog({
  open,
  title,
  onTitleChange,
  onCancel,
  onConfirm
}: Props) {
  return (
    <GenericDialog
      open={open}
      title="Task Title"
      onClose={onCancel}
      actions={
        <>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm} type="submit">Add Task</Button>
        </>
      }
    >
      <DialogContentText>
        To submit the task, please enter a task title describing the task.
      </DialogContentText>
      <TextField
        autoFocus
        required
        margin="dense"
        id="title"
        name="title"
        label="Task Title"
        type="text"
        fullWidth
        variant="standard"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onConfirm();
        }}
        inputProps={{ maxLength: 30 }}
      />
    </GenericDialog>
  );
}