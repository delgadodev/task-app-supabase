import { createContext, useContext, useState } from "react";
import { supabase } from "../libs/utils/supabaseClient";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

// eslint-disable-next-line react/prop-types
const TaskProvider = ({ children }) => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const getTasks = async () => {
    const { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      setError(error);
      return;
    }

    setTasks(tasks);
  };

  const createTask = async (task) => {
    const newTask = {
      description: task,
      user_id: user.id,
      completed: false,
    };

    try {
      const result = await supabase
        .from("tasks")
        .insert(newTask)
        .select()
        .single();

      setTasks([result.data, ...tasks]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (task) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ completed: !task.completed })
        .match({ id: task.id });

      if (error) throw error;

      setTasks(
        tasks.map((task) =>
          task.id === task.id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().match({ id });
    setTasks(tasks.filter((task) => task.id !== id));
    if (error) throw error;
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        error,
        getTasks,
        createTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
