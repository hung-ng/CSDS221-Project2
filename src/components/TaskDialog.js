import {
  Box,
  AppBar,
  Toolbar,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

const TaskDialog = (props) => {
  const [title, setTitle] = useState(!props.add ? props.task.title : "");
  const [description, setDescription] = useState(!props.add ? props.task.description : "");
  const [deadline, setDeadline] = useState(!props.add ? dayjs(props.task.deadline, "MM/DD/YY") : dayjs());
  const [priority, setPriority] = useState(!props.add ? props.task.priority : "Low");
  const [titleError, setTitleError] = useState(0);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleCloseExtra = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setTitleError(false);
    setDescriptionError(false);
    setTitle("");
    setDescription("");
    setDeadline(dayjs());
    setPriority("Low");
    props.handleClose();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeadlineChange = (newValue) => {
    setDeadline(newValue);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const addSubmitHandler = () => {
    let isValid = true;
    if (title === "") {
      setTitleError(1);
      isValid = false;
    } else if (props.tasks.filter((e) => e.title === title).length > 0) {
      setTitleError(2);
      isValid = false;
    } else {
      setTitleError(0);
    }
    if (description === "") {
      setDescriptionError(true);
      isValid = false;
    } else {
      setDescriptionError(false);
    }

    if (isValid) {
      props.handleClose();
      props.addTask({
        title: title,
        description: description,
        deadline: deadline.format("MM/DD/YY").toString(),
        priority: priority,
        isComplete: false,
      });
      setTitle("");
      setDescription("");
      setDeadline(dayjs());
      setPriority("Low");
    }
  };

  const updateSubmitHandler = () => {
    if (description === "") {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
      props.handleClose();
      props.updateTask(props.index, {
        title: props.task.title,
        description: description,
        deadline: deadline.format("MM/DD/YY").toString(),
        priority: priority,
        isComplete: false,
      });
      setTitle("");
      setDescription("");
      setDeadline(dayjs());
      setPriority("Low");
    }
  };

  return (
    <Dialog open={props.open} onClose={handleCloseExtra}>
      <AppBar position="static" color="secondary">
        {props.add ? (
          <Toolbar>
            <AddCircleIcon />
            <span>&nbsp;Add Task</span>
          </Toolbar>
        ) : (
          <Toolbar>
            <EditNoteIcon />
            <span>&nbsp;Edit Task</span>
          </Toolbar>
        )}
      </AppBar>
      <DialogContent>
        <Box component="form">
          <div display="flex">
            {props.add && (
              <div>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Title"
                  value={title}
                  onChange={handleTitleChange}
                  error={titleError > 0}
                  helperText={
                    (titleError === 1 && "Title is Required!") ||
                    (titleError === 2 && "Title already exists!")
                  }
                />
              </div>
            )}
            <div>
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                error={descriptionError}
                helperText={descriptionError && "Description is Required!"}
              />
            </div>
            <div style={{ margin: "1em 0" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Deadline"
                  value={deadline}
                  onChange={handleDeadlineChange}
                />
              </LocalizationProvider>
            </div>
            <div>
              <FormLabel id="priority">Priority</FormLabel>
              <RadioGroup
                row
                id="priority"
                value={priority}
                onChange={handlePriorityChange}
              >
                <FormControlLabel value="Low" control={<Radio />} label="Low" />
                <FormControlLabel value="Med" control={<Radio />} label="Med" />
                <FormControlLabel
                  value="High"
                  control={<Radio />}
                  label="High"
                />
              </RadioGroup>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {props.add ? (
              <div>
                <Button
                  onClick={addSubmitHandler}
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                >
                  Add
                </Button>
              </div>
            ) : (
              <Button
                onClick={updateSubmitHandler}
                variant="contained"
                startIcon={<EditNoteIcon />}
              >
                Edit
              </Button>
            )}
            <div>
              <Button
                variant="contained"
                startIcon={<DoDisturbIcon />}
                onClick={handleCloseExtra}
                color="error"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
