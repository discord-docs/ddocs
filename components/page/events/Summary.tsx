import { styled } from "../../../stitches.config";
import { createRef, FunctionComponent, useEffect, useState } from "react";
import Summary from "../../../lib/api-models/summary";
import Markdown from "../../typography/Markdown";
import ToggleableArror from "../../util/ToggleableArrow";

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

const SummaryHeader = styled("summary", {
  backgroundColor: "$backgroundSecondary",
  padding: "1rem",
  fontSize: "20px",
  zIndex: 2,
  userSelect: "none",
  display: "flex",
  cursor: "pointer",
});

const SummaryBody = styled("div", {
  backgroundColor: "$backgroundSecondaryAlt",
  padding: "1rem 2rem",
  borderRadius: "0px 0px 6px 6px",

  "@mobile": {
    padding: "1rem 0.75rem",
  },
});

const Details = styled("details", {});

const Summary: FunctionComponent<SummaryProps> = ({
  summary,
  fullExpanded,
}) => {
  const [init, setInit] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fixedHeight, setFixedHeight] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [detailHeight, setDetailHeight] = useState(0);
  const [animation, setAnimation] = useState<Animation | undefined>();
  const bodyRef = createRef<HTMLDivElement>();
  const headerRef = createRef<HTMLElement>();
  const detailsRef = createRef<HTMLDetailsElement>();

  useEffect(() => {
    if (init) {
      if (fullExpanded) open();
      else shrink();
    }
  }, [fullExpanded]);

  useEffect(() => {
    if (bodyRef.current) {
      if (bodyRef.current.clientHeight > headerHeight) {
        setBodyHeight(bodyRef.current.clientHeight - headerHeight);
      }

      if (!init) setInit(true);
    }
  }, [bodyRef]);

  useEffect(() => {
    setHeaderHeight(headerRef.current?.clientHeight || 0);
  }, [headerRef]);

  useEffect(() => {
    setDetailHeight(detailsRef.current?.clientHeight || 0);
  }, [detailsRef]);

  const shrink = () => {
    const startHeight = detailsRef.current?.offsetHeight!;
    const endHeight = headerHeight;

    animation?.cancel();

    const an = detailsRef.current!.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      {
        duration: 250,
        easing: "ease-in-out",
      }
    );

    an.onfinish = () => onAnimationComplete(false);
    an.oncancel = () => setIsClosing(false);
    setAnimation(an);
  };

  const open = () => {
    expand();
  };

  const expand = () => {
    const startHeight = detailsRef.current?.offsetHeight!;

    const endHeight = bodyHeight + headerHeight;

    animation?.cancel();

    const an = detailsRef.current!.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      {
        duration: 250,
        easing: "ease-in-out",
      }
    );
    an.onfinish = () => onAnimationComplete(true);
    an.oncancel = () => setIsExpanding(false);

    setAnimation(an);

    setFixedHeight(true);
    setExpanded(true);
    setIsExpanding(true);
  };

  const onAnimationComplete = (open: boolean) => {
    setExpanded(open);
    setFixedHeight(false);
    setOverflow(false);
    setIsClosing(false);
    setIsExpanding(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    if (isClosing || !detailsRef.current?.open) {
      open();
    } else if (isExpanding || detailsRef.current.open) {
      shrink();
    }
    setOverflow(true);
  };

  return (
    <Container>
      <Details
        open={expanded}
        style={{
          overflow: overflow ? "hidden" : "",
          height: fixedHeight ? `${detailHeight}px` : "",
        }}
        ref={detailsRef}
      >
        <SummaryHeader
          onClick={handleClick}
          ref={headerRef}
          style={{
            borderRadius: expanded ? "6px 6px 0px 0px" : "6px",
          }}
        >
          {summary.title}
          <ToggleableArror expanded={expanded} />
        </SummaryHeader>
        {init && (
          <SummaryBody
            style={{
              height: expanded ? "100%" : 0,
            }}
            ref={bodyRef}
          >
            <Markdown content={summary.content} />
          </SummaryBody>
        )}
      </Details>

      {!init && (
        <SummaryBody
          style={{
            zIndex: -255,
            position: "absolute",
            opacity: "0",
          }}
          ref={bodyRef}
        >
          <Markdown content={summary.content} />
        </SummaryBody>
      )}
    </Container>
  );
};

export default Summary;
