import { FunctionComponent, useEffect, useState } from "react";
import { styled } from "../stitches.config";
import AccountButton from "./AccountButton";
import { useAuth } from "./context/AuthContext";
import LoginButton from "./LoginButton";

interface AccountHeaderProps {}

const Container = styled("div", {
  top: "40px",
  right: "40px",
  position: "absolute",
  zIndex: 10,
});

const AccountHeader: FunctionComponent<AccountHeaderProps> = () => {
  const [initialized, setInitialized] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    auth.loginCallback(() => {
      setInitialized(true);
    });
  }, []);

  return (
    <Container>
      {initialized ? (
        <>
          {auth.isAuthenticated ? (
            <AccountButton account={auth.account!} />
          ) : (
            <LoginButton />
          )}
        </>
      ) : undefined}
    </Container>
  );
};

export default AccountHeader;
