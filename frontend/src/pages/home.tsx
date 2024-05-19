import { useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const { setIsLoggedIn } = userContext!;

  const handleClick = () => {
    try {
      console.log("Logging out...");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default Home;
