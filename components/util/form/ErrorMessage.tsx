import { FunctionComponent } from "react";
import Text from "../../typography/Text";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ message }) => {
  return (
    <Text
      size={"small"}
      weight={"medium"}
      css={{
        marginTop: "0.2rem",
        color: "$errorRed",
      }}
    >
      {message}
    </Text>
  );
};

export default ErrorMessage;
