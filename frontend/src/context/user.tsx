import React, { useMemo, useState } from "react";

export type User = {
  UUID: string;
  username: string;
  firstName: string;
  lastName: string;
};

export type UserContextProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export type UserContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = React.createContext<UserContextType | null>(null);

function UserContextProvider({ children }: Readonly<UserContextProviderProps>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const context = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      user,
      setUser,
    }),
    [isLoggedIn, setIsLoggedIn, user, setUser]
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
