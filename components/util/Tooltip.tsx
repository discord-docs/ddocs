import React from "react";
import { FunctionComponent } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { styled } from "../../stitches.config";

interface TooltipProps {
  content: string;
}

const TooltipContainer = styled("div", {
  padding: "5px 10px !important",
  borderRadius: "5px !important",
  background: "$backgroundSecondaryAlt !important",
  color: "$textPrimary !important",
  fontSize: "1rem !important",
  border: "1px solid $backgroundTeritialy !important",
});

const TooltipArrow = styled("div", {
  "&::before": {
    borderColor:
      "$backgroundTeritialy transparent transparent transparent !important",
  },
  "&::after": {
    borderColor:
      "$backgroundSecondaryAlt transparent transparent transparent !important",
  },
});

const Tooltip: FunctionComponent<TooltipProps> = ({ content, children }) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    placement: "top",
  });

  const newChildren = (children as any)(setTriggerRef);

  return (
    <>
      {newChildren}
      {visible && (
        <TooltipContainer
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip-container" })}
        >
          <TooltipArrow {...getArrowProps({ className: "tooltip-arrow" })} />
          {content}
        </TooltipContainer>
      )}
    </>
  );
};

export default Tooltip;
