import { useContext, useEffect, useState } from 'react';
import Layout from '../components/layout';
import NavBar from '../components/navbar';
import apiClient from '../components/axios';
import { User, UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';

function Contacts() {
    const [contacts, setContacts] = useState<User[]>([]);
    const { user } = useContext(UserContext)!;
    const navigate = useNavigate();

    const handleContactClick = async (contactUUID: string) => {
        try {
            console.log(`Starting chat with contact ${contactUUID}...`);
            const response = await apiClient.post('/chat', {
                users: [user?.UUID, contactUUID].map((UUID) => ({ UUID }))
            });
            const { chat } = response.data;
            const users = chat.chatUsers.map((chatUser: { user: User }) => {
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
            console.error('Error starting chat', error);
        }
    };

    useEffect(() => {
        console.log('Fetching contacts...');
        apiClient
            .get('/users')
            .then((response) => {
                const { users } = response.data;
                setContacts(users.filter((u: User) => u.UUID !== user?.UUID));
            })
            .catch((error) => {
                console.error('Unable to fetch contacts', error);
            });
    }, [user?.UUID]);

    return (
        <Layout header="Users" footer={<NavBar />}>
            <div className="flex flex-col w-full gap-2 justify-between overflow-hidden">
                <div className="flex flex-col items-center w-full gap-2 overflow-auto">
                    {contacts.map((contact) => (
                        <div
                            key={contact.UUID}
                            className="flex w-[90%] p-2 border-2 rounded-lg border-transparent bg-stone-900"
                            onClick={() => handleContactClick(contact.UUID)}
                        >
                            <h2>
                                {contact.firstName && contact.lastName
                                    ? `${contact.firstName} ${contact.lastName}`
                                    : contact.username}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Contacts;
