import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/types";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";

const LeftSideBar = () => {
  const { user } = useUserContext();
  // console.log("user ", user);
  const pathName = useLocation();
  // console.log('pathName ', pathName);
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img src="assets/icons/icon.svg" alt="icon" width={35}></img>
          <h2 style={{ color: "white" }}>InstaSnap</h2>
        </Link>

        <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
          <img
            src={user.imageUrl || "assets/icons/profile.svg"}
            className="h-8 w-8 rounded-full"
          ></img>
          <div className="flex flex-col">
            <p className="body-bold">{user.Name}</p>
            <p className="text-light small-regular">@{user.Username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathName.pathname === link.route;
            return <li key={link.label} className={`leftsidebar-link pl-4 ${isActive && 'bg-primary-500'}`}>
              <NavLink
              to={link.route}
              className="flex gap-4 items-center py-4"
              >
                <img src={link.imgURL} alt={link.label}/>
                {link.label}</NavLink>
            </li>;
          })}
        </ul>

       
      </div>
      <Button variant="ghost" className="shad-button_ghost"   onClick={()=>signOut()}
          >
            <img src="assets/icons/logout.svg" width={25} alt="logout"></img>
            <p className="small-medium lg:base-medium">Sign Out</p>
          </Button>
    </nav>
  );
};

export default LeftSideBar;
