import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Layout from '../components/layout';
import Message, { MessageProps } from '../components/message';

const { NEXT_PUBLIC_SOCKET_URL: socketURL = '' } = import.meta.env;

export type ChatPageProps = {
    roomId: string;
};

function Chat() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const { roomId } = useParams<ChatPageProps>();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleBack = () => {
        console.log('Back to home');
        navigate('/');
    };

    const handleSendMessage = useCallback(() => {
        try {
            if (currentMessage.trim() === '') return;
            console.log('Sending message:', currentMessage);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    fromUUID: 'me', // TODO: Get user UUID from user context
                    content: currentMessage,
                    timestamp: new Date()
                }
            ]);
            setCurrentMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, [currentMessage]);

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

    useEffect(() => {
        const socket = io(socketURL);
        socket.emit('joinRoom', roomId);
        return () => {
            socket.emit('leaveRoom', roomId);
            socket.disconnect();
        };
    }, [roomId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    return (
        roomId && (
            <Layout header={`Chat Room: ${roomId}`}>
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
                                const { content, fromUUID, timestamp } =
                                    message;
                                return (
                                    <Message
                                        content={content}
                                        fromUUID={fromUUID}
                                        timestamp={timestamp}
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
