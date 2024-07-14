import { useEffect, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { listenToAuthChanges } from '../util/firebase';
import { User } from 'firebase/auth';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

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
    <>
      {isLoading ? <h1>Loading...</h1> : (
        user ? children : <Navigate to="/get-started" />
      )}
    </>
  );
};

export default PrivateRoute;