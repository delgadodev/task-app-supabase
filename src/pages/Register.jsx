import { useState } from "react";
import { supabase } from "../libs/utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (user.email === "" || user.password === "" || user.name === "") {
      setError("Todos los campos son obligatorios");

      setTimeout(() => {
        setError(null);
      }, 3000);

      return;
    }

    /* Comprobar que la contraseña tenga al menos 6 caracteres */
    if (user.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    /* Comprobar que el nombre tenga al menos 3 caracteres */
    if (user.name.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    try {
      /* Crear el usuario en supabase */

      const { data: userSupabase, error: errorSupabase } =
        await supabase.auth.signUp({
          email: user.email,
          password: user.password,
        });

      if (errorSupabase) throw errorSupabase;

      /* Crear el usuario en la base de datos */

      const { error } = await supabase
        .from("users")
        .insert([
          { email: user.email, name: user.name, uuid: userSupabase.user.id },
        ]);
      if (error) throw error;

      /* Mostrar mensaje de éxito */

      alert("Usuario creado con éxito");

      /* Redirigir al usuario a la página de login */

      navigate("/login");

      /* Limpiar el formulario */

      setUser({
        email: "",
        password: "",
        name: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Registrate
        </h1>

        <form
          onSubmit={handleRegister}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">
            Crea un nuevo usuario
          </p>

          <div>
            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Correo"
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value,
                  });
                }}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Nombre"
                onChange={(e) => {
                  setUser({
                    ...user,
                    name: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Contraseña"
                id="password"
                onChange={(e) => {
                  setUser({
                    ...user,
                    password: e.target.value,
                  });
                }}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => {
                    const passwordInput = document.getElementById("password");
                    if (passwordInput.type === "password") {
                      passwordInput.type = "text";
                    } else {
                      passwordInput.type = "password";
                    }
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors duration-300 "
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
