import { ButtonGroup, Button, Tabs, Tab, styled, Autocomplete, TextField, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Filtering } from "../../Logic/TaskFiltering/Filtering";
import type { Task } from "../../Objects/Task";
import "../../Style/BasicTodoList/ListController.css"
import { useState } from "react";

type props = {
    deleteAllTasks : () => void;
    tabValue : number;
    setTabValue : (value : number) => void;
    taskFiltering : Filtering;
    setFilteredTasks : (tasks : Task[]) => void;
    tasks : Task[];
    filteredTasks : Task[];
}

const CustomTab = styled(Tab)(() => ({
  fontWeight: 'bold',
}));

export default function ListController({
    deleteAllTasks,
    tabValue,
    setTabValue,
    taskFiltering,
    setFilteredTasks,
    tasks,
    filteredTasks
    } : props){

    const [openConfirmDeteleAll, setOpenConfirmDeleteAll] = useState(false);

    const handleTabChange = (newValue : any) => {
        setTabValue(newValue);
        if (newValue === 0) {
            taskFiltering.clearFilters();
            setFilteredTasks(tasks);
        } else if (newValue === 1) {
            taskFiltering.setFilters(["Completed"]);
            setFilteredTasks(taskFiltering.applyFilters(tasks));
        } else if (newValue === 2) {
            taskFiltering.setFilters(["Uncompleted"]);
            setFilteredTasks(taskFiltering.applyFilters(tasks));
        }
    }

    const onSearchBarChange = (value : any) => {
        if (typeof value === 'string' && value !== "") {
            const filterName = `By_title_${value}`;
            taskFiltering.addFilter({
                name: filterName,
                operator: (tasks) => tasks.filter(task => task.title.includes(value)),
            });
            setFilteredTasks(taskFiltering.applyFilters(tasks));
            taskFiltering.removeFilterByName(filterName);
        } else {
            setFilteredTasks(taskFiltering.applyFilters(tasks));
        }
    }

    return(
        <div className="list-controll-pannel">
            <ButtonGroup className='button-group-delete' variant="contained" aria-label="Basic button group">
                <Button 
                  sx={{
                    backgroundColor: 'error.main',
                    color: 'white',
                    '&:hover': {
                    backgroundColor: 'error.dark',
                    },
                }}
                startIcon={<DeleteForeverOutlinedIcon />}  
                onClick={() => {
                    setOpenConfirmDeleteAll(true);
                }}>
                    Delete All
                </Button>
            </ButtonGroup>
            <Autocomplete
                className="search-bar"
                id="free-solo-demo"
                freeSolo
                clearOnEscape
                size="small"
                options={filteredTasks.map((task) => task.title)}
                onChange={(_, value) => {
                    onSearchBarChange(value);
                }}
                renderInput={(params) => <TextField {...params} label="Search tasks" />}
            />
            <Tabs
                value={tabValue}
                onChange={(_, newValue) => {
                    handleTabChange(newValue);
                }}
                aria-label="Task filter tabs"
                variant="fullWidth"
            >
                <CustomTab label="All" />
                <CustomTab label="Completed" />
                <CustomTab label="Uncompleted" />
            </Tabs>

            <Dialog
                open={openConfirmDeteleAll}
                onClose={() => setOpenConfirmDeleteAll(false)}
            >
                <DialogTitle>Delete Tasks</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete all tasks?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{color: "#0A9528"}} onClick={() => setOpenConfirmDeleteAll(false)}>Cancel</Button>
                    <Button sx={{color: "#0A9528"}} onClick={() => {
                        deleteAllTasks();
                        setOpenConfirmDeleteAll(false);
                    }}>Confrim</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}