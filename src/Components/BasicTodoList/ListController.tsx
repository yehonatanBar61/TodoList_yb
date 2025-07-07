import { ButtonGroup, Button, Tabs, Tab, styled, Autocomplete, TextField, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, useMediaQuery, Select, FormControl, InputLabel, MenuItem, Box } from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import "../../Style/BasicTodoList/ListController.css"
import { useState } from "react";
import taskStore from '../../Logic/TaskFiltering/TaskStoreInstance';
import { FilterName } from "../../Logic/TaskFiltering/Filtering";

type props = {
    deleteAllTasks : () => void;
    tabValue : number;
    setTabValue : (value : number) => void;
}

const CustomTab = styled(Tab)(() => ({
  fontWeight: 'bold',
}));

export default function ListController({
    deleteAllTasks,
    tabValue,
    setTabValue,
    } : props){

    const isSmall = useMediaQuery('(max-width:1025px)');
    const isVerySmall = useMediaQuery('(max-width:600px)');
    
    const [openConfirmDeteleAll, setOpenConfirmDeleteAll] = useState(false);

    const handleTabChange = (newValue : any) => {
        setTabValue(newValue);
        if (newValue === 0) {
            taskStore.filtering.clearFilters();
        } else if (newValue === 1) {
            taskStore.filtering.setFilters([FilterName.Completed]);
        } else if (newValue === 2) {
            taskStore.filtering.setFilters([FilterName.Uncompleted]);
        }
    }

    const onSearchBarChange = (value : any) => {
        if (typeof value === 'string' && value !== "") {
            const filterName = FilterName.ByTitle;
            taskStore.filtering.addFilter({
                name: filterName,
                operator: (tasks) => tasks.filter(task => task.title.includes(value)),
            });            
        }else {
            taskStore.Filtering.removeFilterByName(FilterName.ByTitle);
        }
    }

    return(
        <Box className="list-controll-pannel" gap={1}>
            <ButtonGroup className='button-group-delete' variant="contained" aria-label="Basic button group">
                {!isVerySmall && (
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
                    }}
                    >
                    {isSmall ? '' : 'Delete All'}
                    </Button>
                )}
            </ButtonGroup>
            <Autocomplete
                className="search-bar"
                id="free-solo-demo"
                freeSolo
                clearOnEscape
                size="small"
                options={taskStore.filtering.applyFilters(taskStore.tasks).map((task) => task.title)}
                onChange={(_, value) => {
                    onSearchBarChange(value);
                }}
                renderInput={(params) => <TextField {...params} label="Search tasks" />}
            />
            {isSmall ? (
            <FormControl fullWidth>
                <InputLabel id="task-filter-label">Filter</InputLabel>
                <Select
                    labelId="task-filter-label"
                    value={tabValue}
                    label="Filter"
                    onChange={(e) => handleTabChange(e.target.value)}
                    size="small"
                >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>Completed</MenuItem>
                <MenuItem value={2}>Uncompleted</MenuItem>
                </Select>
            </FormControl>
            ) : (
            <Tabs
                value={tabValue}
                onChange={(_, newValue) => {
                handleTabChange(newValue);
                }}
                aria-label="Task filter tabs"
                variant="fullWidth"
            >
                <CustomTab label="All" />
                <CustomTab label={FilterName.Completed} />
                <CustomTab label={FilterName.Uncompleted} />
            </Tabs>
            )}

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
        </Box>
    );
}