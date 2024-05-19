import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useContext } from "react";
import UserContextProvider from "./context/user";
import { UserContext } from "./context/user";
import { RouterProvider } from "react-router-dom";
import {
  AuthenticatedRouter,
  UnauthenticatedRouter,
} from "./components/router";

function App() {
  const userContext = useContext(UserContext);
  const { isLoggedIn } = userContext!;

  return (
    <RouterProvider
      router={isLoggedIn ? AuthenticatedRouter : UnauthenticatedRouter}
    />
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);

export default App;
