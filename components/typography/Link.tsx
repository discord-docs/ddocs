import { FunctionComponent } from "react";
import { css } from "../../stitches.config";
import NextLink from "next/link";
import Text from "./Text";

interface LinkProps {
  external?: boolean;
  href: string;
  decorator?: boolean;
  weight?: "bold" | "medium" | "light";
  size?: "normal" | "medium" | "large";
  color?: "white" | "blue";
  darkenHover?: boolean;
}

const styles = css({
  color: "$brand",
  transition: "color 0.1s ease-in-out",
  variants: {
    darkenHover: {
      true: {
        color: "$itemUnactive !important",

        "&:hover": {
          color: "$brand !important",
        },
      },
    },
    color: {
      blue: {
        color: "$brand",
      },
      white: {
        color: "white",
      },
    },
    textDecoration: {
      true: {
        textDecoration: "underline",
      },
      false: {
        textDecoration: "none",

        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
});

const Link: FunctionComponent<LinkProps> = ({
  external,
  href,
  decorator,
  children,
  weight,
  size,
  color,
  darkenHover,
}) => {
  return external ? (
    <a
      className={styles({
        textDecoration: decorator ?? false,
        color: color,
        darkenHover,
      })}
      href={href}
      target="_blank"
      rel="external noreferrer"
    >
      <Text weight={weight} size={size}>
        {children}
      </Text>
    </a>
  ) : (
    <NextLink href={href}>
      <Text
        weight={weight}
        size={size}
        css={{
          cursor: "pointer",
        }}
        className={styles({
          textDecoration: decorator ?? false,
          color,
          darkenHover,
        })}
      >
        {children}
      </Text>
    </NextLink>
  );
};

export default Link;
