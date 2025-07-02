import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
      <Dialog
        open={open}
        onClose={onCancel}
        >
        <DialogTitle>Task Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To submit the task, please enter task Title describing the task.
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm} type="submit">Add Task</Button>
        </DialogActions>
      </Dialog>
  );
}