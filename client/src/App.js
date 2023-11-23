import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import Homepage from "./pages/Authentication";
import Private from "./pages/Private";
import UserContextProvider from "./Context";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/private",
    element: <Private />,
  },
]);

function App() {
  return (
    <UserContextProvider>
      <div className="bg-[#16202d] h-screen">
        <RouterProvider router={router} />
      </div>
    </UserContextProvider>
  );
}

export default App;
