import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export type props = {
    open: boolean;
    title?: string;
    onClose: () => void;
    children?: React.ReactNode;
    actions?: React.ReactNode; 
}


 export default function GenericDialog({
    open,
    title,
    onClose,
    children,
    actions
    } : props){

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{cancelText}</Button>
                {onConfirm && (
                <Button onClick={onConfirm} autoFocus>
                    {confirmText}
                </Button>
                )}
            </DialogActions>
        </Dialog>
    )
}