import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useTask } from "../context/TaskContext";

const TaskForm = () => {
  const { createTask, error } = useTask();

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      return alert("La tarea no puede estar vacia");
    }

    if (error) {
      return alert(error.message);
    }

    createTask(task);

    setTask("");
    closeModal();
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [task, setTask] = useState("");

  return (
    <>
      <div className="">
        <button
          onClick={openModal}
          className="bg-indigo-600 px-5 py-2 rounded-md text-white shadow-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Crear tarea
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-800">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Nueva tarea
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleCreateTask}>
                      <input
                        type="text"
                        name="tarea"
                        onChange={(e) => setTask(e.target.value)}
                        id="description"
                        className="border border-gray-300 rounded-md w-full p-2 dark:text-black"
                      />

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none transition-colors duration-300"
                        >
                          Guardar
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TaskForm;
