import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout';
import NavBar from '../components/navbar';
import { useContext, useEffect, useState } from 'react';
import apiClient from '../components/axios';
import { User, UserContext } from '../context/user';

export type Chat = {
    UID: string;
    chatUsers: {
        user: {
            UUID: string;
            username: string;
            firstName: string;
            lastName: string;
        };
    }[];
};

function Home() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext)!;
    const [chats, setChats] = useState<Chat[]>([]);

    const handleChatClick = (chat: Chat) => {
        try {
            console.log('Navigating to chat...');
            const users = chat.chatUsers.map((chatUser) => {
                const { firstName, lastName, username } = chatUser.user;
                return firstName && lastName
                    ? `${firstName} ${lastName}`
                    : username;
            });
            navigate(`/chat/${chat.UID}`, {
                state: {
                    users
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getRecipient = (chat: Chat) => {
        const recipient = chat.chatUsers.find(
            (chatUser) => chatUser.user.UUID !== user?.UUID
        );
        const details = recipient?.user as User;
        const { firstName, lastName, username } = details;
        return firstName && lastName ? `${firstName} ${lastName}` : username;
    };

    useEffect(() => {
        console.log('Fetching chats...');
        apiClient
            .get(`/chats/${user?.UUID}`)
            .then((response) => {
                const { chats } = response.data;
                setChats(chats);
            })
            .catch((error) => {
                console.error('Unable to fetch chats', error);
            });
    }, [user?.UUID]);

    return (
        <Layout header="Conversations" footer={<NavBar />}>
            <div className="flex flex-col w-full gap-2 justify-between overflow-hidden">
                <div className="flex flex-col items-center w-full gap-2 overflow-auto">
                    {chats.map((chat) => (
                        <div
                            key={chat.UID}
                            className="flex w-[90%] p-2 border-2 rounded-lg border-transparent bg-stone-900"
                            onClick={() => handleChatClick(chat)}
                        >
                            <h2>{getRecipient(chat)}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Home;
