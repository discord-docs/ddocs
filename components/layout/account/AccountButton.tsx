import Link from "next/link";
import {
  createRef,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { lightTheme, styled } from "../../../stitches.config";
import { Account, AuthContextType } from "../../context/AuthContext";
import Text from "../../typography/Text";
import GracefulImage from "../../util/GracefulImage";

interface AccountButtonProps {
  account: Account;
}

const DesktopLayoutContainer = styled("div", {
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
  color: "white",

  "@mobile": {
    display: "none",
  },
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

const MobileLayoutContainer = styled("div", {
  display: "none",
  height: "50px",
  marginRight: "1rem",
  alignItems: "center",

  "@mobile": {
    display: "flex",
  },
});

const MobileDropdownContainer = styled("div", {
  backgroundColor: "$backgroundTeritialy",
  borderRadius: "5px",
  transition: "all 0.15s ease-in-out",
  right: "10px",
  padding: "0.75rem",
  position: "fixed",
  display: "flex",
  maxWidth: "220px",
  width: "100%",
});

const MobileLeftContentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  flex: "1",
});

const AccountButton: FunctionComponent<AccountButtonProps> = ({ account }) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setHeight(contentRef.current?.clientHeight ?? 0);
  }, [contentRef]);

  return (
    <>
      <MobileLayoutContainer>
        <GracefulImage
          onClick={() => setExpanded(!expanded)}
          id={account.avatar}
          width={32}
          height={32}
          style={{
            borderRadius: "32px",
            cursor: "pointer",
          }}
        />
        <MobileDropdownContainer
          css={{
            opacity: expanded ? 1 : 0,
            top: expanded ? "55px" : "50px",
          }}
        >
          <MobileLeftContentContainer>
            <Text
              css={{
                color: "$itemUnactive",
              }}
              size={"small"}
            >
              Logged in as
            </Text>
            <Text
              css={{}}
              size={"normal"}
              weight={"bold"}
            >{`${account.username}#${account.discriminator}`}</Text>
          </MobileLeftContentContainer>
          <Link href="/logout">
            <Text
              size={"normal"}
              weight={"medium"}
              css={{
                color: "#ED4245",
                alignSelf: "center",
                cursor: "pointer",
              }}
            >
              Logout
            </Text>
          </Link>
        </MobileDropdownContainer>
      </MobileLayoutContainer>
      <DesktopLayoutContainer
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        style={{
          height: expanded ? `${64 + height}px` : "64px",
        }}
      >
        <OuterContentContainer>
          <GracefulImage
            id={account.avatar}
            width={40}
            height={40}
            style={{
              margin: "0.75rem",
              borderRadius: "32px",
            }}
          ></GracefulImage>
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
      </DesktopLayoutContainer>
    </>
  );
};

export default AccountButton;
