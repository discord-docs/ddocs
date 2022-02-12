import React, { createRef, useEffect } from "react";
import { FunctionComponent } from "react";
import { config, css, styled } from "../../stitches.config";
import Icon from "../Icons/Icon";
import Scrollbar from "../layout/Scrollbar";
import Header from "../typography/Header";
import CloseIcon from "@mui/icons-material/Close";
import Draggable from "react-draggable";

interface ModalProps {
  open: boolean;
  title?: string;
  className?: string;
  footer?: React.ReactNode;
  onClickeOutside?: () => void;
}

const ModalContainer = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  transition: "background-color 0.1s ease-in-out",
  zIndex: "25520",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
});

const ModalContent = styled("div", {
  background: "$backgroundSecondary",
  maxHeight: "80vh",
  maxWidth: "50%",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",

  "@mobile": {
    borderRadius: "0",
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
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

  "@mobile": {
    maxHeight: "100%",
    height: "100%",
  },
});

const FooterContainer = styled("div", {
  borderTop: "1px solid $backgroundAccent",
  margin: "auto 1rem 1rem 1rem",
});

const Close = styled(CloseIcon, {
  position: "absolute",
  top: "16px",
  right: "16px",
  width: "24px",
  height: "24px",
  fill: "$headerPrimary",
});

const Modal: FunctionComponent<ModalProps> = ({
  open,
  title,
  children,
  className,
  footer,
  onClickeOutside,
}) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const modalRef = React.createRef<HTMLDivElement>();
  const containerRef = React.createRef<HTMLDivElement>();
  const [modalHeight, setModalHeight] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [setPos, setPosState] = React.useState(false);

  const handleMediaCheck = (m: MediaQueryListEvent) => {
    setIsMobile(m.matches);
  };

  useEffect(() => {
    if (modalRef.current) {
      setModalHeight(modalRef.current.clientHeight);
    }
  }, [modalRef]);

  useEffect(() => {
    const matchMedia = window.matchMedia(config.media.mobile);
    setIsMobile(matchMedia.matches);

    matchMedia.addEventListener("change", handleMediaCheck);

    return () => {
      matchMedia.removeEventListener("change", handleMediaCheck);
    };
  }, []);

  useEffect(() => {
    if (isMobile && modalRef.current) {
      if (open) {
        modalRef.current.animate(
          [
            {
              transform: `translate(0px, ${open ? modalHeight : 0}px)`,
            },
            {
              transform: `translate(0px, ${!open ? modalHeight : 0}px)`,
            },
          ],
          {
            easing: "ease-in-out",
            duration: 300,
          }
        );

        setTimeout(() => {
          setPosState(true);
        }, 300);
      } else {
        setTimeout(() => {
          setPosState(false);
        }, 150);
      }
    }
  }, [open]);

  return (
    <ModalContainer
      ref={containerRef}
      onClick={(e) => {
        if (
          modalRef.current &&
          onClickeOutside &&
          e.target === containerRef.current
        ) {
          // check if the click was inside the modal
          if (e.target === containerRef.current) {
            onClickeOutside();
          }
        }
      }}
      className={`${className ?? ""}`}
      css={{
        pointerEvents: open ? "all" : "none",
        backgroundColor: open ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
      }}
    >
      {isMobile ? (
        <Draggable
          nodeRef={modalRef}
          cancel=".modal-ignore"
          axis="y"
          bounds={{ top: 0, left: 0, right: 0 }}
          position={open && setPos ? { x: 0, y: 0 } : { x: 0, y: modalHeight }}
          onDrag={(e, a) => {
            //console.log(e, a);
          }}
          onStart={() => setDragging(true)}
          onStop={(e, d) => {
            const closed = d.y > modalHeight / 2;

            modalRef.current!.animate(
              [
                {
                  transform: `translate(0px, ${d.y}px)`,
                },
                {
                  transform: `translate(0px, ${closed ? modalHeight : 0}px)`,
                },
              ],
              {
                easing: "ease-in-out",
                duration: 150,
              }
            );

            setDragging(false);
            if (d.y > modalHeight / 2 && onClickeOutside) {
              onClickeOutside();
            }
          }}
        >
          <ModalContent
            ref={modalRef}
            css={{
              transition:
                setPos && !dragging ? "transform 0.15s ease-in-out" : "none",
            }}
          >
            <Header variant="h3" className={`${HeaderStyle}`}>
              {title ?? "Modal"}
            </Header>
            <Close />
            <ModalChildren className={`${Scrollbar()}`}>
              {children}
            </ModalChildren>
            <FooterContainer>{footer}</FooterContainer>
          </ModalContent>
        </Draggable>
      ) : (
        <>
          {open && (
            <ModalContent ref={modalRef}>
              <Header variant="h3" className={`${HeaderStyle}`}>
                {title ?? "Modal"}
              </Header>
              <Close />
              <ModalChildren className={`${Scrollbar()}`}>
                {children}
              </ModalChildren>
              <FooterContainer>{footer}</FooterContainer>
            </ModalContent>
          )}
        </>
      )}
    </ModalContainer>
  );
};

export default Modal;
