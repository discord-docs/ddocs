import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { styled } from "../../stitches.config";
import Text from "./Text";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Header from "./Header";

interface MarkdownProps {
  content?: string;
}

const Image = styled("img", {
  width: "-moz-available;width:-webkit-fill-available",
  borderRadius: "10px",
  objectFit: "contain",
  margin: "1rem",
});

const Link = styled("a", {
  color: "var(--ddocs-colors-brand)",
});

const Quote = styled("blockquote", {
  borderLeft: "5px solid #444",
  borderRadius: "5px",
  margin: "0.5rem 0.25rem",
  padding: "0.25rem 0.5rem",
  background: "#222",
});

const UnorderedList = styled("ul", {
  paddingLeft: "1.5rem",
});

const OrderedList = styled("ol", {
  paddingLeft: "1.5rem",
});

const HR = styled("hr", {
  margin: "1rem 0",
});

const ListItem = styled("li", {
  fontSize: "20px",
  fontWeight: "200",
  lineHeight: "1.2",
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
          return (
            <Header className={className} variant={"h1"}>
              {children}
            </Header>
          );
        },
        h2({ node, className, children, ...props }) {
          return (
            <Header className={className} variant={"h2"}>
              {children}
            </Header>
          );
        },
        h3({ node, className, children, ...props }) {
          return (
            <Header className={className} variant={"h3"}>
              {children}
            </Header>
          );
        },
        h4({ node, className, children, ...props }) {
          return (
            <Header className={className} variant={"h4"}>
              {children}
            </Header>
          );
        },
        h5({ node, className, children, ...props }) {
          return (
            <Header className={className} variant={"h5"}>
              {children}
            </Header>
          );
        },
        h6({ node, className, children, ...props }) {
          return (
            <Header className={className} variant={"h6"}>
              {children}
            </Header>
          );
        },
        p(props) {
          return (
            <Text weight={"medium"} size={"medium"}>
              {props.children}
            </Text>
          );
        },
        ul({ children, ...props }) {
          return <UnorderedList {...props}>{children}</UnorderedList>;
        },
        ol({ children, ...props }) {
          return <OrderedList {...props}>{children}</OrderedList>;
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
