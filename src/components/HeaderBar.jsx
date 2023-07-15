import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";
import { AiOutlineLogout, AiFillSmile } from "react-icons/ai";
import { useState } from "react";
import { supabase } from "../libs/utils/supabaseClient";

const HeaderBar = () => {
  const { signOut, user } = useAuth();
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();
  const isDarkModeEnabled = localStorage.getItem("darkMode");
  if (isDarkModeEnabled === "true") {
    localStorage.setItem("darkMode", false);
    document.querySelector("html").classList.remove("dark");
  }

  const darkModeToggle = () => {
    /*  Guardar el estado del darkmode en el localstorage */

    if (isDarkModeEnabled === "false") {
      localStorage.setItem("darkMode", true);
      document.querySelector("html").classList.add("dark");
    }

    if (isDarkModeEnabled === null) {
      localStorage.setItem("darkMode", true);
      document.querySelector("html").classList.add("dark");
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await signOut();

      if (error) throw error;

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("uuid", user.id)
        .single();

      setProfile(profile);
    };

    getProfile();
  }, []);

  return (
    <div className="flex flex-col-reverse md:flex-row bg-white dark:bg-slate-800 items-center justify-between mt-16 shadow-md p-5 rounded-lg">
      <div className="flex flex-col items-center gap-5">
        <p className="font-bold md:text-2xl">Bienvenido, {profile?.name}</p>
        <TaskForm />
      </div>

      <div className="">
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
              <Menu.Items className="absolute right-[-20px] md:right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-2 py-2 hover:bg-slate-50 rounded-md">
                  <Menu.Item>
                    <div className="flex items-center gap-2">
                      <AiFillSmile />
                      <Link className="dark:text-black" to={"/profile/" + user.id}>Mi perfil</Link>
                    </div>
                  </Menu.Item>
                </div>
                <div className="px-2 py-2 hover:bg-slate-50 rounded-md">
                  <Menu.Item>
                    <button type="button" onClick={handleLogout}>
                      <div className="flex items-center gap-2 dark:text-black">
                        <AiOutlineLogout />
                        Cerrar Sesion
                      </div>
                    </button>
                  </Menu.Item>
                </div>

                <div className="px-2 py-2 hover:bg-slate-50 rounded-md">
                  <Menu.Item>
                    <button onClick={darkModeToggle} type="button">
                      <div className="dark:text-black">Dark mode</div>
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
