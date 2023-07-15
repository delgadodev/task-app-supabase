import { useEffect } from "react";
import HeaderBar from "../components/HeaderBar";
import Task from "../components/Task";
import { useTask } from "../context/TaskContext";

const Home = () => {
  const { getTasks, tasks, deleteTask, updateTask } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <div className="lg:max-w-5xl md:max-w-2xl max-w-xs mx-auto h-screen">
        <HeaderBar />

        <div>
          {tasks.map((task) => (
            <Task
              key={task?.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
