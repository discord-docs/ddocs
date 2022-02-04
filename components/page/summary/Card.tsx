import { FC } from "react";
import { css, styled } from "../../../stitches.config";
import Panel from "../../util/Panel";
import Image from "next/image";
import Text from "../../typography/Text";

interface MetricProps {
  title: string;
  image?: string;
  isLoading?: boolean;
  className?: string;
}

const Header = styled("header", {
  fontWeight: "700",
  fontSize: 20,
});

const Padding = styled("div", {
  padding: 12,
});

const test = css({
  lineHeight: "18px",
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  overflow: "hidden",
});

const Card: FC<MetricProps> = ({ title, className, children, image }) => {
  let lines = image ? 5 : 14; // no image
  const lineClamp = css({ "-webkit-line-clamp": lines });
  const textStyle = [test(), lineClamp()].join(" ");
  return (
    <Panel className={className} color="dark" padding="nopad">
      {image && <Image src={image} width={250} height={150} alt="card image" />}
      <Padding>
        <Header>{title}</Header>
        <Text className={textStyle}>{children}</Text>
      </Padding>
    </Panel>
  );
};

export default Card;
