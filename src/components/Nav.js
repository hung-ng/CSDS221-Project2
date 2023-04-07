import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TaskDialog from "./TaskDialog";
import { useState } from "react";

const Nav = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="static" color="secondary" sx={{ height: "8.3vh" }}>
        <Toolbar>
          <Grid container>
            <Grid
              item
              sm={6.5}
              display="flex"
              flexDirection="row-reverse"
              fontSize={"1.25em"}
            >
              <div>
                <FontAwesomeIcon icon={faBars} />
                <span>&nbsp;FRAMEWORK</span>
              </div>
            </Grid>
            <Grid item sm={5.5} display="flex" flexDirection="row-reverse">
              <Button
                onClick={handleOpen}
                variant="contained"
                startIcon={<AddCircleIcon />}
              >
                Add
              </Button>
              <TaskDialog
                open={open}
                tasks={props.tasks}
                addTask={props.addTask}
                handleClose={handleClose}
                add={true}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;