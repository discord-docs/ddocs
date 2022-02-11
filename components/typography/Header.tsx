import React from "react";
import { FunctionComponent } from "react";
import { css } from "../../stitches.config";

interface HeaderProps {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

const styles = {
  h1: css({
    fontWeight: "bold",
    fontSize: "32px",

    "@mobile": {
      fontSize: "28px",
    },
  }),
  h2: css({
    fontWeight: "bold",
    fontSize: "24px",

    "@mobile": {
      fontSize: "20px",
    },
  }),
  h3: css({
    fontWeight: "normal",
    fontSize: "24px",

    "@mobile": {
      fontSize: "20px",
    },
  }),
  h4: css({
    fontWeight: "bold",
    fontSize: "20px",

    "@mobile": {
      fontSize: "16px",
    },
  }),
  h5: css({
    fontWeight: "normal",
    fontSize: "20px",

    "@mobile": {
      fontSize: "16px",
    },
  }),
  h6: css({
    fontWeight: "bold",
    fontSize: "18px",

    "@mobile": {
      fontSize: "16px",
    },
  }),
};

const Header: FunctionComponent<HeaderProps> = ({
  variant,
  children,
  className,
}) => {
  return React.createElement(
    variant,
    { className: `${styles[variant]()} ${className ?? ""}` },
    children
  );
};

export default Header;
