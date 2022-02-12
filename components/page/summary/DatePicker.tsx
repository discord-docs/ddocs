import { FC, useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import Icon from "../../util/Icon";

const DatePickerContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "auto auto 1fr auto auto",
  columnGap: 6,
  borderRadius: 6,
  height: 42,
  width: 288,
  overflow: "hidden",
  userSelect: "none",

  "@mobile": {
    width: "70%",
  },
});

DatePickerContainer.displayName = "DatePicker";

const IconWrapper = styled("div", {
  padding: 13,
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "#4C5AE8",
  "&:hover": {
    backgroundColor: "#5865F2",
  },
});

IconWrapper.displayName = "IconWrapper";

const CurrentValue = styled("div", {
  padding: 13,
  textAlign: "center",
  backgroundColor: "#4C5AE8",
});

interface DatePickerProps {
  values: string[];
  current: string;
  onChange?: (value: string) => void;
}

const DatePicker: FC<DatePickerProps> = ({ values, current, onChange }) => {
  // remove duplicates
  const entries = [...new Set(values)];

  const [currentIndex, setCurrentIndex] = useState(
    entries.findIndex((v) => v === current)
  );

  useEffect(() => {
    if (onChange) onChange(entries[currentIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const seekRelative = (offset: number) => {
    const incrementing = offset > 0;

    if (incrementing && currentIndex + offset >= entries.length) {
      return setCurrentIndex(entries.length - 1);
    }

    if (!incrementing && currentIndex + offset < 0) {
      return setCurrentIndex(0);
    }

    setCurrentIndex(currentIndex + offset);
  };

  const seek = (offset: number) => {
    const incrementing = offset > 0;

    if (incrementing && offset >= entries.length - 1) {
      return setCurrentIndex(entries.length - 1);
    }

    if (!incrementing && offset < 0) {
      return setCurrentIndex(0);
    }

    setCurrentIndex(offset);
  };

  return (
    <DatePickerContainer>
      <IconWrapper
        onClick={() => {
          seek(0);
        }}
      >
        <Icon icon="arrow-double-left" />
      </IconWrapper>
      <IconWrapper
        onClick={() => {
          seekRelative(-1);
        }}
      >
        <Icon icon="arrow-single-left" />
      </IconWrapper>
      <CurrentValue>{entries[currentIndex]}</CurrentValue>
      <IconWrapper
        onClick={() => {
          seekRelative(1);
        }}
      >
        <Icon icon="arrow-single-right" />
      </IconWrapper>
      <IconWrapper
        onClick={() => {
          seek(entries.length - 1);
        }}
      >
        <Icon icon="arrow-double-right" />
      </IconWrapper>
    </DatePickerContainer>
  );
};

export default DatePicker;
