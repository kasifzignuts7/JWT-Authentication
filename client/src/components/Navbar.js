import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../Context";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // logout handler
  async function handleLogout() {
    await axios.get("/logout", { withCredentials: true }).then(() => {
      //set user to null and navigate to home
      setUser(null);
      navigate("/");
    });
  }

  return (
    <nav className="py-6 mx-4 md:mx-14 flex flex-col md:flex-row md:justify-between items-center">
      <a className="cursor-pointer" href="/">
        <img
          src="https://i.ibb.co/M1kWNR6/Zignuts-logo-1.png"
          alt="Zignuts Technolab Logo"
          className="h-14"
        />
      </a>
      <div className="flex mt-4 md:mt-0">
        {user && (
          <button
            className="bg-indigo-600 text-white px-4 md:px-6 py-2 rounded-lg mx-2 md:my-0 md:mx-2 hover:bg-indigo-500"
            onClick={handleLogout}
          >
            logout
          </button>
        )}

        {!user && (
          <a
            href="/"
            className="bg-indigo-600 text-white px-4 md:px-6 py-2 rounded-lg mx-2 md:my-0 md:mx-2 hover:bg-indigo-500"
          >
            Authenticate
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
