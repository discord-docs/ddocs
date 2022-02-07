import { useTheme } from "next-themes";
import { FunctionComponent } from "react";
import { styled } from "../../stitches.config";
import Icon from "../../public/assets/images/theme-change.svg";

interface ThemeToggleProps {}

const ThemeToggleButton = styled("div", {
  cursor: "pointer",
  marginLeft: "auto",
});

const ThemeToggle: FunctionComponent<ThemeToggleProps> = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeToggleButton
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <Icon />
    </ThemeToggleButton>
  );
};

export default ThemeToggle;
