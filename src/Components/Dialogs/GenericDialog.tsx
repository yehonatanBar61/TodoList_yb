import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

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
        <Dialog open={open} onClose={onClose}>
        {title && <DialogTitle>{title}</DialogTitle>}

        <DialogContent>
            {children}
        </DialogContent>

        {actions && (
            <DialogActions>
            {actions}
            </DialogActions>
        )}
        </Dialog>
    )
}