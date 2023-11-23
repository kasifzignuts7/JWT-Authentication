import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserContext } from "../Context";

const Private = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    //user not found, navigate to home
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-48 text-center">
        <h3 className="text-white text-4xl">Welcome to Private Page!</h3>
      </div>
    </>
  );
};

export default Private;
