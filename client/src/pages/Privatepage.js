import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context";
import axios from "axios";

const PrivatePage = () => {
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // user not found, navigate to home
    if (!user) {
      navigate("/");
      return;
    }

    // make the backend API call
    const config = {
      headers: {
        Authorization: `Bearer ${user.jwt}`,
      },
    };

    axios
      .get("/private", config)
      .then(({ data }) => {
        setMessage(data.message);
      })
      .catch((err) => {
        console.log("Axios error: ", err);
      });
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center mt-48 text-center">
      <h3 className="text-white text-4xl">
        {message ? message : "Loading..."}
      </h3>
    </div>
  );
};

export default PrivatePage;
