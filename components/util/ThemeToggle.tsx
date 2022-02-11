import { useTheme } from "next-themes";
import { FunctionComponent } from "react";
import { styled, CSS } from "../../stitches.config";
import Icon from "../../public/assets/images/theme-change.svg";

interface ThemeToggleProps {
  css?: CSS;
}

const ThemeToggleButton = styled("div", {
  cursor: "pointer",
});

const ThemeToggle: FunctionComponent<ThemeToggleProps> = ({ css }) => {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeToggleButton
      css={css}
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <Icon />
    </ThemeToggleButton>
  );
};

export default ThemeToggle;
