import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import Layout from '../components/layout';
import Message, { MessageProps } from '../components/message';
import { UserContext } from '../context/user';
import apiClient from '../components/axios';

const { VITE_API_URL: socketURL = '' } = import.meta.env;

export type ChatPageProps = {
    roomId: string;
};

function Chat() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const users = state?.users as string[];
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const { roomId } = useParams<ChatPageProps>();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { user } = useContext(UserContext)!;
    const socketRef = useRef<Socket | null>(null);

    const handleBack = () => {
        console.log('Back to home');
        navigate('/');
    };

    const handleSendMessage = useCallback(() => {
        try {
            if (currentMessage.trim() === '' || !socketRef.current) return;
            console.log('Sending message:', currentMessage);
            socketRef.current.emit('send-message', {
                fromUUID: user!.UUID,
                content: currentMessage,
                timestamp: new Date(),
                roomId
            });
            setCurrentMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, [currentMessage, user, roomId]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            switch (e.key) {
                case 'Enter':
                    handleSendMessage();
                    break;
                case 'Escape':
                    navigate('/');
                    break;
                default:
                    break;
            }
        },
        [handleSendMessage, navigate]
    );

    useEffect(() => {
        const listener = handleKeyDown as unknown as EventListener;
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, [handleKeyDown]);

    const fetchMessages = useCallback(async () => {
        try {
            const response = await apiClient.get(`/messages/${roomId}`);
            const { messages } = response.data;
            setMessages(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }, [setMessages, roomId]);

    useEffect(() => {
        fetchMessages().then(() => {
            if (!socketRef.current) {
                socketRef.current = io(socketURL);
            }
            socketRef.current.emit('joinRoom', roomId);
            socketRef.current.on('receive-message', async () => {
                await fetchMessages();
            });
        });
        return () => {
            socketRef.current?.off('receive-message');
            socketRef.current?.emit('leaveRoom', roomId);
        };
    }, [roomId, fetchMessages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    return (
        roomId && (
            <Layout header={`Chat with: ${users?.join(', ')}`}>
                <div className="flex flex-col w-full h-full overflow-hidden justify-end">
                    <div
                        id="chatPageContainer"
                        className="flex flex-col w-full overflow-y-auto"
                    >
                        <div
                            id="chatContainer"
                            className="flex flex-col justify-end flex-grow relative w-full p-2 gap-2 text-stone-400"
                        >
                            {messages.map((message) => {
                                const { UID, content, fromUUID, timestamp } =
                                    message;
                                return (
                                    <Message
                                        key={UID}
                                        content={content}
                                        fromUUID={fromUUID}
                                        timestamp={timestamp}
                                        UID={UID}
                                    />
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div
                        id="chatInputContainer"
                        className="flex w-full gap-2 justify-center items-center relative"
                    >
                        <button
                            className="p-2 rounded-md w-fit bg-stone-700"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                        <input
                            className="p-2 rounded-md w-[75%]"
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                        />
                        <button
                            className="p-2 rounded-md w-fit bg-stone-700"
                            onClick={handleSendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </Layout>
        )
    );
}

export default Chat;
