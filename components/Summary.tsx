import { styled } from "@stitches/react";
import { createRef, FunctionComponent, useEffect, useState } from "react";
import Summary from "../lib/api-models/summary";
import Markdown from "./Markdown";
import ToggleableArror from "./ToggleableArrow";

interface SummaryProps {
  summary: Summary;
  fullExpanded: boolean;
}

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: "6px",
});

const SummaryHeader = styled("div", {
  backgroundColor: "#2F3136",
  padding: "1rem",
  fontSize: "20px",
  zIndex: 2,
  userSelect: "none",
  transition: "all 0.15s ease-in-out",
  display: "flex",
  cursor: "pointer",
});

const SummaryBody = styled("div", {
  transition: "all 0.15s ease-in-out",
  backgroundColor: "#18191C",
  padding: "1rem 2rem",
  borderRadius: "0px 0px 6px 6px",
});

const Summary: FunctionComponent<SummaryProps> = ({
  summary,
  fullExpanded,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [init, setInit] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);
  const bodyRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setExpanded(fullExpanded);
  }, [fullExpanded]);

  useEffect(() => {
    setBodyHeight(bodyRef.current?.clientHeight || 0);
  }, [bodyRef]);

  useEffect(() => {
    setTimeout(() => setInit(true), 200);
  }, []);
  return (
    <Container>
      <SummaryHeader
        style={{
          borderRadius: expanded ? "6px 6px 0px 0px" : "6px",
        }}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {summary.title}
        <ToggleableArror expanded={expanded} />
      </SummaryHeader>
      <SummaryBody
        style={{
          marginTop: expanded ? "0px" : `-${bodyHeight + 1}px`,
          position: init ? "relative" : "absolute",
          zIndex: init ? 1 : -5,
        }}
        ref={bodyRef}
      >
        <Markdown content={summary.content} />
      </SummaryBody>
    </Container>
  );
};

export default Summary;
