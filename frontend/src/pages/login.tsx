import { useContext, useState } from "react";
import { User, UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import apiClient, { setAuthToken } from "../components/axios";

export type LoginProps = {
  signup?: boolean;
};

function Login({ signup }: LoginProps) {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const { setIsLoggedIn, setUser } = userContext!;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const validateFields = () => {
    if (username.length === 0) {
      console.error("Username is required.");
      return false;
    } else if (password.length === 0) {
      console.error("Password is required.");
      return false;
    }
    if(signup) {
      if(firstName.length === 0) {
        console.error("First name is required.");
        return false;
      } else if (lastName.length === 0) {
        console.error("Last name is required.");
        return false;
      }
    }
    return true;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSignup = async () => {
    const response = await apiClient.post("/signup", {
      username,
      password,
      firstName,
      lastName,
    });
    const { user } = response.data;
    const { token, ...details } = user;
    return { token, details };
  }

  const handleLogin = async () => {
    const response = await apiClient.post("/login", {
      username,
      password,
    });
    const { user } = response.data;
    const { token, ...details } = user;
    return { token, details };
  }

  const handleSubmit = async () => {
    try {
      if (validateFields()) {
        let user: {
          token: string;
          details: User;
        };
        if (signup) {
          user = await handleSignup();
        } else {
          user = await handleLogin();
        }
        const { token, details } = user;
        setAuthToken(token);
        setUser(details as User);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center w-full text-stone-400">
      <h1 className="text-4xl font-bold">NotsApp</h1>
      <div className="flex flex-col gap-3 p-5 border-2 rounded-lg border-transparent bg-stone-900">
        <h2 className="text-xl font-bold">
          {signup ? "Sign up" : "Log in"}
        </h2>
        <hr className="bg-stone-400" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="p-2 rounded-md"
        />
        {
          signup && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="p-2 rounded-md"
              />
            </>
          )
        }
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="p-2 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="flex bg-stone-700 w-fit self-center p-2 rounded-lg font-semibold m-2"
        >
          {signup ? "Sign up" : "Log in"}
        </button>
      </div>
    </div>
  );
}

export default Login;
