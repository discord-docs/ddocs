import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";

const Logout: NextPage = () => {
  const [logoutSuccessful, setLogoutSuccessful] = useState<boolean | undefined>(
    undefined
  );
  const auth = useAuth();

  const logout = async () => {
    auth.clearUser();
    setLogoutSuccessful(true);
  };

  useEffect(() => {
    auth.loginCallback((isAuthed, account) => {
      console.log("callback", isAuthed);
      if (!isAuthed) {
        setLogoutSuccessful(false);
      } else {
        logout();
      }
    });
  }, []);

  return (
    <>
      {logoutSuccessful === undefined ? (
        <div>Logging out...</div>
      ) : logoutSuccessful ? (
        <div>Logout successful!</div>
      ) : (
        <div>Logout failed!</div>
      )}
    </>
  );
};

export default Logout;
