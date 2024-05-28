import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout';
import NavBar from '../components/navbar';

const chats: Array<{
    uuid: string;
    name: string;
}> = [
    {
        uuid: '1',
        name: 'Chat 1'
    },
    {
        uuid: '2',
        name: 'Chat 2'
    },
    {
        uuid: '3',
        name: 'Chat 3'
    },
    {
        uuid: '4',
        name: 'Chat 4'
    },
    {
        uuid: '5',
        name: 'Chat 5'
    },
    {
        uuid: '6',
        name: 'Chat 6'
    },
    {
        uuid: '7',
        name: 'Chat 7'
    },
    {
        uuid: '8',
        name: 'Chat 8'
    },
    {
        uuid: '9',
        name: 'Chat 9'
    },
    {
        uuid: '10',
        name: 'Chat 10'
    }
];

function Home() {
    const navigate = useNavigate();

    const handleChatClick = (chatId: string) => {
        try {
            console.log('Navigating to chat...');
            navigate(`/chat/${chatId}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout header="Conversations" footer={<NavBar />}>
            <div className="flex flex-col w-full gap-2 justify-between overflow-hidden">
                <div className="flex flex-col items-center w-full gap-2 overflow-auto">
                    {chats.map((chat) => (
                        <div
                            key={chat.uuid}
                            className="flex w-[90%] p-2 border-2 rounded-lg border-transparent bg-stone-900"
                            onClick={() => handleChatClick(chat.uuid)}
                        >
                            <h2>{chat.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Home;
