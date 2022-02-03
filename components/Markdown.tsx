import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { styled } from "../stitches.config";
import Text from "./Text";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface MarkdownProps {
  content?: string;
}

const Image = styled("img", {
  width: "100%",
  borderRadius: "10px",
  maxHeight: "400px",
  objectFit: "contain",
});

const H1 = styled("h1", {
  fontWeight: "bold",
  fontSize: "32px",
});

const H2 = styled("h2", {
  fontWeight: "bold",
  fontSize: "24px",
});

const H3 = styled("h3", {
  fontWeight: "normal",
  fontSize: "24px",
});

const H4 = styled("h4", {
  fontWeight: "bold",
  fontSize: "20px",
});

const H5 = styled("h5", {
  fontWeight: "normal",
  fontSize: "20px",
});

const H6 = styled("h6", {
  fontWeight: "bold",
  fontSize: "18px",
});

const Link = styled("a", {
  color: "White",
});

const Quote = styled("blockquote", {
  borderLeft: "5px solid #444",
  borderRadius: "5px",
  margin: "0.5rem 0.25rem",
  paddingLeft: "0.5rem",
});

const HR = styled("hr", {
  margin: "1rem 0",
});

const ListItem = styled("li", {
  fontSize: "20px",
  fontWeight: "200",
  "&::marker": {
    unicodeBidi: "isolate",
    fontVariantNumeric: "tabular-nums",
    textTransform: "none",
    textIndent: "0",
    textAlign: "start",
    textAlignLast: "start",
  },
});

const Markdown: FunctionComponent<MarkdownProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1({ node, className, children, ...props }) {
          return <H1>{children}</H1>;
        },
        h2({ node, className, children, ...props }) {
          return <H2>{children}</H2>;
        },
        h3({ node, className, children, ...props }) {
          return <H3>{children}</H3>;
        },
        h4({ node, className, children, ...props }) {
          return <H4>{children}</H4>;
        },
        h5({ node, className, children, ...props }) {
          return <H5>{children}</H5>;
        },
        h6({ node, className, children, ...props }) {
          return <H6>{children}</H6>;
        },
        p(props) {
          return (
            <Text weight={"medium"} size={"medium"}>
              {props.children}
            </Text>
          );
        },
        a({ node, className, children, ...props }) {
          return <Link {...props}>{children}</Link>;
        },
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language={match ? match[1] : undefined}
              PreTag="div"
              style={atomDark}
              {...props}
            />
          );
        },
        li({ children, ...props }) {
          return <ListItem {...props}>{children}</ListItem>;
        },
        blockquote({ children, ...props }) {
          return <Quote {...props}>{children}</Quote>;
        },
        img(props) {
          return <Image {...props} />;
        },
        hr({ ...props }) {
          return <HR {...props} />;
        },
      }}
    >
      {content || ""}
    </ReactMarkdown>
  );
};

export default Markdown;
