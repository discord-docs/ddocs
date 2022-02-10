import { useRouter } from "next/router";
import { CSSProperties, FunctionComponent, useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import AccountButton from "./AccountButton";
import { useAuth } from "../../context/AuthContext";
import LoginButton from "./LoginButton";

interface AccountHeaderProps {}

const Container = styled("div", {
  zIndex: 10,
  "@mobile": {
    position: "fixed",
    top: 0,
    right: 0,
  },
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
