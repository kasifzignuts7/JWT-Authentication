import HomePage from "./pages/Homepage";
import PrivatePage from "./pages/Privatepage";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import axios from "axios";
import UserContextProvider from "./Context";

// basic axios configurations
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

// app layout
const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

// router configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/private", element: <PrivatePage /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <div className="bg-[#16202d] min-h-screen">
        <RouterProvider router={appRouter} />
      </div>
    </UserContextProvider>
  );
}

export default App;
