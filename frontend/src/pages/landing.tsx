import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 text-stone-400">
            <h1 className="text-4xl font-bold">NotsApp 2.0</h1>
            <div className="flex flex-col items-center justify-center w-[75%] text-center">
                <button
                    onClick={handleSignup}
                    className="flex w-full bg-stone-700 self-center p-2 rounded-lg font-semibold m-2 justify-center"
                >
                    Sign up
                </button>
                <button
                    onClick={handleLogin}
                    className="flex w-full bg-stone-700 self-center p-2 rounded-lg font-semibold m-2 justify-center"
                >
                    Log in
                </button>
            </div>
        </div>
    );
}

export default Landing;
