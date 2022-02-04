import Link from "next/link";
import {
  createRef,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "../../../stitches.config";
import { Account, AuthContextType } from "../../context/AuthContext";

interface AccountButtonProps {
  account: Account;
}

const Avatar = styled("img", {
  height: "40px",
  margin: "0.75rem",
  borderRadius: "32px",
});

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "64px",
  position: "relative",
  borderRadius: "12px",
  backgroundColor: "#18191C",
  transition: "all 0.25s ease-in-out",
  overflow: "hidden",
  flexDirection: "row",
});

const OuterContentContainer = styled("div", {
  height: "64px",
  marginBottom: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#18191C",
  zIndex: 5,
  strong: {
    marginRight: "0.25rem",
    fontSize: "20px",
  },
});

const InnerContentContainer = styled("div", {
  overflow: "hidden",
  transition: "all 0.25s ease-in-out",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  bottom: "0px",
  width: "100%",
});

const LogoutButton = styled("div", {
  color: "#ED4245",
  fontSize: "20px",
  margin: "0.25rem",
  cursor: "pointer",
  userSelect: "none",
  fontWeight: "200",
});

const DropdownItem = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginBottom: "0.75rem",
});

const ArrowIcon = styled("svg", {
  width: "24px",
  height: "16px",
  fill: "white",
  transition: "all 0.25s ease-in-out",
  marginRight: "0.75rem",
});

const AccountButton: FunctionComponent<AccountButtonProps> = ({ account }) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setHeight(contentRef.current?.clientHeight ?? 0);
  }, [contentRef]);

  return (
    <Container
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        height: expanded ? `${64 + height}px` : "64px",
      }}
    >
      <OuterContentContainer>
        <Avatar src={account.avatar}></Avatar>
        <strong>{`${account.username}#${account.discriminator}`}</strong>
        <ArrowIcon
          viewBox="0 0 24 24"
          style={{
            transform: expanded ? "rotate(0deg)" : "rotate(90deg)",
          }}
        >
          <path d="M 23.9375 7.273438 C 23.785156 6.839844 23.371094 6.546875 22.910156 6.546875 L 1.089844 6.546875 C 0.628906 6.546875 0.214844 6.839844 0.0625 7.273438 C -0.0898438 7.710938 0.046875 8.199219 0.410156 8.488281 L 11.320312 17.214844 C 11.519531 17.375 11.757812 17.453125 12 17.453125 C 12.242188 17.453125 12.484375 17.375 12.683594 17.214844 L 23.589844 8.488281 C 23.953125 8.199219 24.089844 7.710938 23.9375 7.273438 Z M 23.9375 7.273438 " />
        </ArrowIcon>
      </OuterContentContainer>

      <InnerContentContainer ref={contentRef}>
        <DropdownItem>
          <Link href="/logout">
            <LogoutButton>Logout</LogoutButton>
          </Link>
        </DropdownItem>
      </InnerContentContainer>
    </Container>
  );
};

export default AccountButton;
