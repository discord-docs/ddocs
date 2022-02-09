import { CSSProperties } from "@stitches/react";
import { createRef, FunctionComponent, useEffect } from "react";
import { css, styled } from "../../../stitches.config";
import Header from "../../typography/Header";
import ErrorMessage from "./ErrorMessage";
import FormItemTitle from "./FormItemTitle";

interface TextboxProps {
  title: string;
  required?: boolean;
  multiline?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
  className?: string;
  css?: CSSProperties;
  placeholder?: string;
  resize?: "none" | "both" | "horizontal" | "vertical";
  inputRef?: any;
  onClick?: (
    event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement, MouseEvent>
  ) => void;
  active?: boolean;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  invalid?: boolean;
  shakeOnInvalid?: boolean;
  invalidMessage?: string;
}

const TextContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  width: "100%",
  backgroundColor: "$textInput",
});

const CommonStyles = css({
  fontSize: "1rem",
  backgroundColor: "transparent",
  border: "1px solid $textInput",
  outline: "none",
  borderRadius: "3px",
  transition: "border 0.2s ease-in-out",
  color: "$textNormal",

  "&:focus-visible": {
    border: "1px solid $brand !important",
  },
  "&:hover": {
    border: "1px solid $backgroundAccent",
  },

  width: "100%",
  padding: "10px",
});

const Input = styled("input", {
  height: "40px",
});

const TextArea = styled("textarea", {});

const ActiveStyles = css({
  border: "1px solid $brand !important",
});

const InvalidStyles = css({
  border: "1px solid $buttonDanger !important",
});

const Textbox: FunctionComponent<TextboxProps> = ({
  multiline,
  rows,
  value,
  onChange,
  className,
  css,
  placeholder,
  title,
  required,
  resize,
  inputRef,
  onClick,
  active,
  onKeyDown,
  invalid,
  shakeOnInvalid,
  invalidMessage,
}) => {
  className ??= "";

  const containerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (invalid && shakeOnInvalid && containerRef.current) {
      containerRef.current.animate(
        [
          {
            marginLeft: "10px",
          },
          {
            marginLeft: "-5px",
          },
          {
            marginLe: "2px",
          },
          {
            marginLeft: "0px",
          },
        ],
        {
          easing: "ease-in-out",
          duration: 100,
        }
      );
    }
  }, [invalid]);

  return (
    <>
      <FormItemTitle title={title} required={required} />
      <TextContainer ref={containerRef} css={{ ...css }}>
        {multiline ? (
          <TextArea
            rows={rows}
            onKeyDown={onKeyDown}
            ref={inputRef}
            placeholder={placeholder}
            className={`${CommonStyles} ${className} ${
              active ? ActiveStyles : ""
            } ${invalid ? InvalidStyles : ""}`}
            css={{
              resize: resize,
            }}
            value={value}
            onChange={(e) => {
              if (onChange) onChange(e?.target?.value ?? "");
            }}
            onClick={onClick}
          ></TextArea>
        ) : (
          <Input
            onKeyDown={onKeyDown}
            ref={inputRef}
            onChange={(e) => {
              if (onChange) onChange(e?.target?.value ?? "");
            }}
            placeholder={placeholder}
            className={`${CommonStyles} ${className} ${
              active ? ActiveStyles : ""
            } ${invalid ? InvalidStyles : ""}`}
            value={value}
            onClick={onClick}
          ></Input>
        )}
      </TextContainer>
      {invalid && invalidMessage && <ErrorMessage message={invalidMessage} />}
    </>
  );
};

export default Textbox;
