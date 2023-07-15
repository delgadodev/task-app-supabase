import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../libs/utils/supabaseClient";

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

  return <div>
    <h1>Hola, {profile.name}</h1>
  </div>;
};

export default Profile;
