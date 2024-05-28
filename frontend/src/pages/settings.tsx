import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';
import Layout from '../components/layout';
import NavBar from '../components/navbar';

function Settings() {
    const navigate = useNavigate();

    const userContext = useContext(UserContext);
    const { setIsLoggedIn } = userContext!;

    const handleLogout = () => {
        try {
            console.log('Logging out...');
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout header="Settings" footer={<NavBar />}>
            <div className="flex flex-col w-full gap-2 justify-center overflow-hidden">
                <div className="flex flex-col items-center w-full gap-2 overflow-auto">
                    <button
                        onClick={handleLogout}
                        className="flex bg-stone-700 w-fit self-center p-2 rounded-lg font-semibold m-2"
                    >
                        Log out
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default Settings;
