import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { styled } from "../stitches.config";
import Text from "./Text";

interface MarkdownProps {
  content?: string;
}

const MarkdownContainer = styled("div", {
  img: {
    width: "100%",
    borderRadius: "10px",
    maxHeight: "400px",
    objectFit: "contain",
  },
});

const Markdown: FunctionComponent<MarkdownProps> = ({ content }) => {
  return (
    <MarkdownContainer>
      <ReactMarkdown
        components={{
          p(props) {
            return <Text>{props.children}</Text>;
          },
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </MarkdownContainer>
  );
};

export default Markdown;
