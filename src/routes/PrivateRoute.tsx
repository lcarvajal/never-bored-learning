import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../routes/UserContext";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user ? children : <Navigate to="/get-started" />}
    </>
  );
};

export default PrivateRoute;
