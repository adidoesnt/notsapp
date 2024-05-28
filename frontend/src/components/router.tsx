import {
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import Login from '../pages/login';
import Home from '../pages/home';
import Chat from '../pages/chat';
import Contacts from '../pages/contacts';
import Settings from '../pages/settings';

export const UnauthenticatedRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login signup />} />
        </Route>
    )
);

export const AuthenticatedRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chat/:roomId" element={<Chat />} />
        </Route>
    )
);
