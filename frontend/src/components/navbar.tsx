import React from 'react';
import { useNavigate } from 'react-router-dom';

type NavBarIconProps = {
    icon: string;
    label: string;
    target: string;
};

const NavBarIcon = ({ icon, label, target }: NavBarIconProps) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(target);
    };

    return (
        <button onClick={onClick}>
            <img src={icon} alt={label} className="w-[32px] h-[32px]" />
        </button>
    );
};

type NavBarProps = {
    icons: NavBarIconProps[];
};

function NavBar({ icons }: NavBarProps) {
    return (
        <div className="flex gap-8 justify-between items-center p-4 text-white">
            {icons.map((icon) => (
                <NavBarIcon key={icon.label} {...icon} />
            ))}
        </div>
    );
}

function DefaultNavBar() {
    const icons = [
        {
            icon: '/chat-icon.svg',
            label: 'Chats',
            target: '/'
        },
        {
            icon: '/contacts-icon.svg',
            label: 'Contacts',
            target: '/contacts'
        },
        {
            icon: '/settings-icon.svg',
            label: 'Settings',
            target: '/settings'
        }
    ];

    return <NavBar icons={icons} />;
}

const MemoNavBar = React.memo(DefaultNavBar);

export default MemoNavBar;
