import { styled } from "@stitches/react";
import { createRef, FunctionComponent, useEffect, useState } from "react";
import Summary from "../lib/api-models/summary";
import Markdown from "./Markdown";
import ToggleableArror from "./ToggleableArrow";

interface SummaryProps {
  summary: Summary;
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

const Summary: FunctionComponent<SummaryProps> = ({ summary }) => {
  return (
    <div>
      <Markdown content={summary.content} />
    </div>
  );
};

export default Summary;
