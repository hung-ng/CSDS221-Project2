import Nav from "./components/Nav";
import TaskTable from "./components/TaskTable";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const deleteTask = (index) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task, i) => i !== index);
    });
    toast.success("Task was deleted successfully", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  const addTask = (task) => {
    setTasks((prevTasks) => {
      return [...prevTasks, task];
    });
    toast.success("Task was added successfully", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  const updateTask = (index, newTask) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task, i) => {
        if (i === index) {
          return newTask;
        }
        return task;
      });
    });
    toast.success("Task was updated successfully", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div>
      <Nav tasks={tasks} addTask={addTask} />
      <TaskTable
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
