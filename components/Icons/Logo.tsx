import { FunctionComponent } from "react";
import { styled } from "../../stitches.config";
import Icon from "./Icon";

interface LogoProps extends React.SVGAttributes<HTMLOrSVGElement> {}

const SiteLogo = styled(Icon, {
  ".site-logo-white_svg__logo-rect": {
    fill: "none !important",
  },

  ".site-logo-white_svg__logo-body": {
    fill: "$textNormal",
  },

  ".site-logo-white_svg__logo-lines": {
    fill: "$backgroundPrimary",
  },
});

const Logo: FunctionComponent<LogoProps> = ({ ...props }) => {
  return <SiteLogo {...props} icon="site-logo-white"></SiteLogo>;
};

export default Logo;
