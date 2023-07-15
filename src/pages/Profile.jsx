import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../libs/utils/supabaseClient";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Profile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const { data: profile, error } = await supabase
        .from("users")
        .select("*")
        .eq("uuid", id)
        .single();

      if (error) navigate("*");

      setProfile(profile);
    };

    getProfile();
  }, []);

  console.log(profile);

  return (
    <div className="grid h-screen w-screen place-content-center bg-slate-50 ">
      <div className="w-[15%] flex items-center justify-center rounded-md shadow-md p-4 bg-white m-5">
        <Link to={"/"} className="text-center">
          <AiOutlineArrowLeft />
        </Link>
      </div>

      <div className="bg-white w-[90%] mx-auto p-10 flex flex-col gap-10 rounded-md shadow-md">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="h-20 w-20 bg-black rounded-full"></div>
          <h1 className="text-2xl font-bold">{profile?.name}</h1>
        </div>

        <div className="flex gap-5">
          <button className="bg-indigo-500 text-white px-2  rounded-md">
            Cambiar foto de perfil
          </button>

          <button className="bg-red-500 text-white px-2 py-1 rounded-md">
            Eliminar cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
