import { FunctionComponent } from "react";
import { styled } from "../stitches.config";
import AccountButton from "./AccountButton";
import { useAuth } from "./context/AuthContext";
import LoginButton from "./LoginButton";

interface AccountHeaderProps {}

const Container = styled("div", {
  top: "40px",
  right: "40px",
  position: "absolute",
});

const AccountHeader: FunctionComponent<AccountHeaderProps> = () => {
  const auth = useAuth();

  return (
    <Container>
      {auth.isAuthenticated ? (
        <AccountButton account={auth.account!} />
      ) : (
        <LoginButton
          onClick={() => {
            // todo
          }}
        />
      )}
    </Container>
  );
};

export default AccountHeader;
