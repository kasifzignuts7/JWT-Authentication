import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context";
import axios from "axios";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // user found redirect to private page
    if (user) {
      navigate("/private");
    }
  }, [user, navigate]);

  // auth handler
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/auth", { email, password })
      .then(({ data }) => {
        if (!data.error) {
          const userObj = { id: data.id, jwt: data.jwt };
          setUser(userObj);
          localStorage.setItem("user", JSON.stringify(userObj));
          navigate("/private");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div className="flex gap-2 items-center flex-col text-white mt-36">
      <h1 className="text-4xl text-center mb-4">Authentication</h1>
      <form className="w-72" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="your@email.com"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center block mx-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;
