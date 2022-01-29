import { FC, useEffect, useState } from 'react';

interface IconProps {
  icon: string;
}

const Icon: FC<IconProps> = ({ icon }) => {
  const [component, setComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    import(`../public/assets/icons/${icon}.svg`).then(module => {
      setComponent(module.default);
    });
  }, [icon]);

  return component;
};

export default Icon;
