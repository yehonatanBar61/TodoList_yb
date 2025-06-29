import { ButtonGroup, Button, Tabs, Tab } from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import type { Filtering } from "../../Logic/TaskFiltering/Filtering";
import type { Task } from "../../Objects/Task";

type props = {
    deleteAllTasks : () => void;
    tabValue : number;
    setTabValue : (value : number) => void;
    taskFiltering : Filtering;
    setFilteredTasks : (tasks : Task[]) => void;
    tasks : Task[];
}

export default function ListController({
    deleteAllTasks,
    tabValue,
    setTabValue,
    taskFiltering,
    setFilteredTasks,
    tasks
    } : props){

    return(
        <div className="list-controll-pannel">
            <ButtonGroup className='button-group-delete' variant="contained" aria-label="Basic button group">
                <Button 
                startIcon={<DeleteForeverOutlinedIcon />}  
                onClick={() => {
                    deleteAllTasks();
                }}>
                    Delete All
                </Button>
            </ButtonGroup>
            <Tabs
                value={tabValue}
                onChange={(_, newValue) => {
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
                }}
                aria-label="Task filter tabs"
                variant="fullWidth"
            >
                <Tab label="All" />
                <Tab label="Completed" />
                <Tab label="Uncompleted" />
            </Tabs>
        </div>
    );
}