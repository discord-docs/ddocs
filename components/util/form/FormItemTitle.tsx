import { FunctionComponent } from "react";
import { css, styled } from "../../../stitches.config";
import Header from "../../typography/Header";

interface FormItemTitleProps {
  title: string;
  required?: boolean;
}

const RequiredSpan = styled("span", {
  color: "hsl(359,calc(1*82.6%),59.4%)",
});

const HeaderStyles = css({
  fontSize: "1rem",
  fontWeight: "300",
  lineHeight: "20px",
  marginBottom: "8px",
  marginTop: "16px",
});

const FormItemTitle: FunctionComponent<FormItemTitleProps> = ({
  title,
  required,
}) => {
  return (
    <Header className={`${HeaderStyles}`} variant="h6">
      {title} {required && <RequiredSpan>{"*"}</RequiredSpan>}
    </Header>
  );
};

export default FormItemTitle;
