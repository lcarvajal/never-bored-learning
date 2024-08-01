import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { listenToAuthChanges } from '../util/firebase';

interface UserContextProps {
  user: User | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextProps>({ user: null, isLoading: true });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
