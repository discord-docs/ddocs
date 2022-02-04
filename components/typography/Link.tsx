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
}

const styles = css({
  color: "$brand",
  variants: {
    textDecoration: {
      true: {
        textDecoration: "underline",
      },
      false: {
        textDecoration: "none",
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
}) => {
  return external ? (
    <a
      className={styles({ textDecoration: decorator ?? false })}
      href={href}
      target="_blank"
      rel="external"
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
        className={styles({ textDecoration: decorator ?? false })}
      >
        {children}
      </Text>
    </NextLink>
  );
};

export default Link;
