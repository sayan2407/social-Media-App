import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {

  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const {user} = useUserContext();

  useEffect(()=>{
    console.log('isSuccess => ', isSuccess);
    if ( isSuccess ) {
      navigate(0);
    }
  }, [isSuccess])
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
        <img src="assets/icons/icon.svg" alt="icon" width={35} ></img>
        <h2 style={{ color: "white" }}>InstaSnap</h2>
        </Link>

        <div className="flex gap-4">
          <Button variant="ghost" className="shad-button_ghost"   onClick={()=>signOut()}
          >
            <img src="assets/icons/logout.svg" width={20} alt="logout"></img>
          </Button>

          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
            src={
              user.imageUrl || "assets/icons/profile.svg"
            }
            className="h-8 w-8 rounded-full"
            ></img>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
