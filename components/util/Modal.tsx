import { FunctionComponent } from "react";
import { css, styled } from "../../stitches.config";
import Scrollbar from "../layout/Scrollbar";
import Header from "../typography/Header";

interface ModalProps {
  open: boolean;
  title?: string;
  className?: string;
  footer?: React.ReactNode;
}

const ModalContainer = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "10",
  justifyContent: "center",
  alignItems: "center",
});

const ModalContent = styled("div", {
  background: "$backgroundSecondary",
  maxHeight: "80vh",
  maxWidth: "50%",
  borderRadius: "5px",
});

const HeaderStyle = css({
  borderBottom: "1px solid $backgroundAccent",
  margin: "1rem 1rem 0 1rem",
  paddingBottom: "0.5rem",
});

const ModalChildren = styled("div", {
  padding: "1rem",
  overflowY: "auto",
  maxHeight: "70vh",
});

const FooterContainer = styled("div", {
  borderTop: "1px solid $backgroundAccent",
  margin: "0 1rem 1rem 1rem",
});

const Modal: FunctionComponent<ModalProps> = ({
  open,
  title,
  children,
  className,
  footer,
}) => {
  return (
    <ModalContainer
      className={`${className ?? ""}`}
      css={{ display: open ? "flex" : "none" }}
    >
      <ModalContent>
        <Header variant="h3" className={`${HeaderStyle}`}>
          {title ?? "Modal"}
        </Header>
        <ModalChildren className={`${Scrollbar()}`}>{children}</ModalChildren>
        <FooterContainer>{footer}</FooterContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
