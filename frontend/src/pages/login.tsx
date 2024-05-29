import { useCallback, useContext, useEffect, useState } from 'react';
import { User, UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';
import apiClient, { setAuthToken } from '../components/axios';

export type LoginProps = {
    signup?: boolean;
};

function Login({ signup }: LoginProps) {
    const navigate = useNavigate();

    const userContext = useContext(UserContext);
    const { setIsLoggedIn, setUser } = userContext!;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const validateFields = useCallback(() => {
        if (username.length === 0) {
            console.error('Username is required.');
            return false;
        } else if (password.length === 0) {
            console.error('Password is required.');
            return false;
        }
        if (signup) {
            if (firstName.length === 0) {
                console.error('First name is required.');
                return false;
            } else if (lastName.length === 0) {
                console.error('Last name is required.');
                return false;
            }
        }
        return true;
    }, [
        firstName.length,
        lastName.length,
        password.length,
        signup,
        username.length
    ]);

    const handleSignup = useCallback(async () => {
        const response = await apiClient.post('/signup', {
            username,
            password,
            firstName,
            lastName
        });
        const { user } = response.data;
        const { token, ...details } = user;
        return { token, details };
    }, [firstName, lastName, password, username]);

    const handleLogin = useCallback(async () => {
        const response = await apiClient.post('/login', {
            username,
            password
        });
        const { user } = response.data;
        const { token, ...details } = user;
        return { token, details };
    }, [password, username]);

    const handleBack = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const handleSubmit = useCallback(async () => {
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
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }, [
        handleLogin,
        handleSignup,
        navigate,
        setIsLoggedIn,
        setUser,
        signup,
        validateFields
    ]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            switch (e.key) {
                case 'Enter':
                    handleSubmit();
                    break;
                case 'Escape':
                    handleBack();
                    break;
                default:
                    break;
            }
        },
        [handleSubmit, handleBack]
    );

    useEffect(() => {
        const listener = handleKeyDown as unknown as EventListener;
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, [handleKeyDown]);

    return (
        <div className="flex flex-col gap-5 items-center w-full text-stone-400">
            <h1 className="text-4xl font-bold">NotsApp</h1>
            <div className="flex flex-col gap-3 p-5 border-2 rounded-lg border-transparent bg-stone-900">
                <h2 className="text-xl font-bold">
                    {signup ? 'Sign up' : 'Log in'}
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
                {signup && (
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
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="p-2 rounded-md"
                />
                <div className="grid grid-cols-2">
                    <button
                        onClick={handleBack}
                        className="flex justify-center text-center bg-stone-700 self-center p-2 rounded-lg font-semibold m-2"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex justify-center text-center bg-stone-700 self-center p-2 rounded-lg font-semibold m-2"
                    >
                        {signup ? 'Sign up' : 'Log in'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
