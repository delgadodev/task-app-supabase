import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";

const HeaderBar = () => {
  const { signOut, user } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await signOut();

      if (error) throw error;

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-white items-center justify-between mt-16 shadow-md p-5 rounded-lg">
      <div className="space-y-4">
        <p className="font-bold text-2xl">Bienvenido, {user.email}</p>
        <TaskForm />
      </div>

      <div>
        <div className="">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="h-16 w-16 bg-black rounded-full"></Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-2 py-2 hover:bg-slate-50 rounded-md">
                  <Menu.Item>
                    <button type="button" onClick={handleLogout}>
                      Logout
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
