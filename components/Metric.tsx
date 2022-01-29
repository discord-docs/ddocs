import { FC } from "react";
import { css, styled } from "../stitches.config";
import Panel from "./Panel";
import Text from "./Text";

interface MetricProps {
  title: string;
  formattedValue?: any;
  isLoading?: boolean;
  pctChange: number;
  className?: string;
}

const Header = styled("header", {
  color: "#b9bbbe",
  fontSize: "12px",
  fontWeight: "700",
  lineHeight: "16px",
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
});

const value = css({
  margin: "8px 0",
});

const Metric: FC<MetricProps> = ({ title, formattedValue, className }) => {
  return (
    <Panel className={className}>
      <Header>{title}</Header>
      <Text className={value()} weight="bold" size="large">
        {formattedValue}
      </Text>
    </Panel>
  );
};

export default Metric;
