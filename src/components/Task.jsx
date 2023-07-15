/* eslint-disable react/prop-types */
const Task = ({ task, deleteTask, updateTask }) => {
  const taskUpdate = async (task) => {
    await updateTask(task);
  };

  return (
    <div
      key={task?.id}
      className="flex justify-between items-center bg-white dark:bg-slate-800  shadow-md rounded-md px-5 py-5 my-2"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-3"
          onChange={() => taskUpdate(task)}
          checked={task?.completed}
        />
        <p className="text-gray-900 font-semibold dark:text-white">{task?.description}</p>
      </div>
      <button onClick={() => deleteTask(task?.id)} className="text-red-500">
        Eliminar
      </button>
    </div>
  );
};

export default Task;
