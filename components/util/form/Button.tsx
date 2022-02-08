import { FunctionComponent } from "react";
import { styled } from "../../../stitches.config";

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: "primary" | "secondary" | "success" | "danger" | "warning";
}

const StyledButton = styled("div", {
  position: "relative",
  cursor: "pointer",
  padding: "0.5rem 1rem",
  color: "white",
  borderRadius: "4px",
  width: "fit-content",
  transition: "background-color 0.2s ease-in-out",
  userSelect: "none",

  variants: {
    style: {
      primary: {
        backgroundColor: "$buttonPrimary",

        "&:hover": {
          backgroundColor: "$buttonPrimaryHover",
        },
      },
      secondary: {
        backgroundColor: "$buttonSecondary",

        "&:hover": {
          backgroundColor: "$buttonSecondaryHover",
        },
      },
      success: {
        backgroundColor: "$buttonSuccess",

        "&:hover": {
          backgroundColor: "$buttonSuccessHover",
        },
      },
      danger: {
        backgroundColor: "$buttonDanger",
      },
      warning: {
        backgroundColor: "$buttonWarning",
      },
    },
  },
  defaultVariants: {
    style: "primary",
  },
});

export const Button: FunctionComponent<ButtonProps> = ({
  disabled,
  onClick,
  className,
  children,
  style,
}) => {
  return (
    <div
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        width: "fit-content",
      }}
    >
      <StyledButton
        css={{
          opacity: disabled ? 0.6 : 1,
          pointerEvents: disabled ? "none" : "auto",
        }}
        aria-disabled={disabled}
        className={className}
        onClick={() => {
          if (!disabled && onClick) onClick();
        }}
        style={style}
      >
        {children}
      </StyledButton>
    </div>
  );
};

export default Button;
