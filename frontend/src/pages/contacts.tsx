import Layout from '../components/layout';
import NavBar from '../components/navbar';

const contacts: Array<{
    uuid: string;
    username: string;
    firstName: string;
    lastName: string;
}> = [
    {
        uuid: '1',
        firstName: 'Chat 1',
        lastName: 'User 1',
        username: 'chat1user1'
    },
    {
        uuid: '2',
        firstName: 'Chat 2',
        lastName: 'User 2',
        username: 'chat2user2'
    },
    {
        uuid: '3',
        firstName: 'Chat 3',
        lastName: 'User 3',
        username: 'chat3user3'
    },
    {
        uuid: '4',
        firstName: 'Chat 4',
        lastName: 'User 4',
        username: 'chat4user4'
    },
    {
        uuid: '5',
        firstName: 'Chat 5',
        lastName: 'User 5',
        username: 'chat5user5'
    },
    {
        uuid: '6',
        firstName: 'Chat 6',
        lastName: 'User 6',
        username: 'chat6user6'
    },
    {
        uuid: '7',
        firstName: 'Chat 7',
        lastName: 'User 7',
        username: 'chat7user7'
    },
    {
        uuid: '8',
        firstName: 'Chat 8',
        lastName: 'User 8',
        username: 'chat8user8'
    },
    {
        uuid: '9',
        firstName: 'Chat 9',
        lastName: 'User 9',
        username: 'chat9user9'
    },
    {
        uuid: '10',
        firstName: 'Chat 10',
        lastName: 'User 10',
        username: 'chat10user10'
    }
];

function Contacts() {
    const handleContactClick = (contactUUID: string) => {
        try {
            console.log(`Starting chat with contact ${contactUUID}...`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout header="Users" footer={<NavBar />}>
            <div className="flex flex-col w-full gap-2 justify-between overflow-hidden">
                <div className="flex flex-col items-center w-full gap-2 overflow-auto">
                    {contacts.map((contact) => (
                        <div
                            key={contact.uuid}
                            className="flex w-[90%] p-2 border-2 rounded-lg border-transparent bg-stone-900"
                            onClick={() => handleContactClick(contact.uuid)}
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
