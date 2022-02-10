import React from "react";
import { FC, useEffect, useState } from "react";

interface IconProps extends React.SVGAttributes<HTMLOrSVGElement> {
  icon: string;
}

const Icon: FC<IconProps> = ({ icon, ...props }) => {
  const [component, setComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    import(`../../public/assets/icons/${icon}.svg`).then((module) => {
      setComponent((module.default as any)(props));
    });
  }, [icon]);

  return component;
};

export default Icon;
