import { useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";

const chats: Array<{
  uuid: string;
  name: string;
}> = [
  {
    uuid: "1",
    name: "Chat 1",
  },
  {
    uuid: "2",
    name: "Chat 2",
  },
    {
        uuid: "3",
        name: "Chat 3",
    },
    {
        uuid: "4",
        name: "Chat 4",
    },
    {
        uuid: "5",
        name: "Chat 5",
    },
    {
        uuid: "6",
        name: "Chat 6",
    },
    {
        uuid: "7",
        name: "Chat 7",
    },
    {
        uuid: "8",
        name: "Chat 8",
    },
    {
        uuid: "9",
        name: "Chat 9",
    },
    {
        uuid: "10",
        name: "Chat 10",
    },
];

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
    <Layout header="Home">
      <div className="flex flex-col w-full gap-2 justify-between overflow-hidden">
        <div className="flex flex-col items-center w-full gap-2 overflow-auto">
          {chats.map((chat) => (
            <div
              key={chat.uuid}
              className="flex w-[90%] p-2 border-2 rounded-lg border-transparent bg-stone-900"
            >
              <h2>{chat.name}</h2>
            </div>
          ))}
        </div>
        <button
          onClick={handleClick}
          className="flex bg-stone-700 w-fit self-center p-2 rounded-lg font-semibold m-2"
        >
          Log out
        </button>
      </div>
    </Layout>
  );
}

export default Home;
