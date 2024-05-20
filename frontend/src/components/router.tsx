import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import Chat from "../pages/chat";

export const UnauthenticatedRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

export const AuthenticatedRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/chat/:roomId" element={<Chat />} />
    </Route>
  )
);
