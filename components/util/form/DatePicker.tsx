import React, {
  Dispatch,
  forwardRef,
  ForwardRefRenderFunction,
  FunctionComponent,
  Ref,
  SetStateAction,
  useState,
} from "react";
import DatePickerComponent from "react-datepicker";
import { css, styled } from "../../../stitches.config";
import Header from "../../typography/Header";
import FormItemTitle from "./FormItemTitle";
import TextInput from "./TextInput";

interface DatePickerProps {
  title: string;
  required?: boolean;
  type: "date" | "time" | "datetime";
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

const DatePickerContainer = styled("div", {
  width: "100%",

  ".react-datepicker": {
    background: "$backgroundPrimary",
    color: "$textNormal",
    boxShadow: "#1c1c1cbb 0 0 20px 6px",
    border: "1px solid $backgroundSecondary",
  },

  ".react-datepicker-time__header": {
    color: "$textNormal",
  },

  ".react-datepicker__header ": {
    background: "$backgroundPrimary",
    color: "$textNormal",
    borderBottom: "1px solid $backgroundAccent",
  },
  ".react-datepicker__current-month": {
    color: "$textNormal",
  },

  ".react-datepicker__day-name": {
    color: "$textNormal",
  },

  ".react-datepicker__day": {
    position: "relative",
    color: "$textNormal",

    "&:hover": {
      background: "$brand",
    },
  },

  ".react-datepicker__time-list-item": {
    backgroundColor: "$backgroundTeritialy",
    "&:hover": {
      backgroundColor: "$brand !important",
    },
  },

  ".react-datepicker__time-list": {
    "&::-webkit-scrollbar": {
      width: "0.5rem",
    },

    "&::-webkit-scrollbar-track": {
      background: "$scrollbarTrack",
    },

    "&::-webkit-scrollbar-thumb": {
      background: "$scrollbarThumb",
      borderRadius: "0.25rem",
    },
  },

  ".react-datepicker__day--selected": {
    background: "none",
    "&::after": {
      content: '" "',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "3px",
      background: "$brand",
      borderRadius: "3px",
    },
  },
});

const Input = styled("input", {
  fontSize: "1rem",
  backgroundColor: "$textInput",
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
  height: "40px",
});

interface InputProps {
  required: boolean;
  title: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const CustomInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { title, required, setOpen, ...props },
  ref
) => {
  return (
    <>
      <FormItemTitle title={title} required={required} />
      <Input
        ref={ref}
        {...props}
        onClick={() => {
          setOpen(true);
        }}
      />
    </>
  );
};

const CustomInputForwarded = forwardRef(CustomInput);

const DatePicker: FunctionComponent<DatePickerProps> = ({
  title,
  required,
  type,
  className,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DatePickerContainer className={`${className || ""}`}>
      <DatePickerComponent
        open={open}
        showTimeSelect={
          type === "datetime" || type === "time" ? true : undefined
        }
        showTimeSelectOnly={type === "time" ? true : undefined}
        timeIntervals={15}
        timeCaption="Time"
        autoFocus={open}
        disabledKeyboardNavigation
        dateFormat={type === "time" ? "h:mm aa" : "MMMM d, yyyy"}
        selected={value}
        onChange={(e) => {
          if (e && onChange) {
            onChange(e as Date);
          }
        }}
        customInput={
          <CustomInputForwarded
            title={title}
            setOpen={setOpen}
            required={required ?? false}
          />
        }
        popperPlacement="top"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [0, -40],
            },
          },
        ]}
        onClickOutside={() => {
          setOpen(false);
        }}
      ></DatePickerComponent>
    </DatePickerContainer>
  );
};

export default DatePicker;
