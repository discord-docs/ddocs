import { styled } from "@stitches/react";
import { FunctionComponent, useEffect, useState } from "react";
import Spinner from "../Spinner";

interface SearchbarProps {
  onSearch?: (query: string) => void;
  onChange?: (query: string) => void;
  loading?: boolean;
}

const Input = styled("input", {
  borderRadius: "16px",
  height: "32px",
  width: "100%",
  padding: "0 2.25rem 0 1rem",
  border: "none",
  fontSize: "1rem",
  fontWeight: "400",
  fontFamily: "Whitney",

  "&:focus-visible": {
    outline: "none",
  },
});

const Icon = styled("svg", {
  width: "20px",
  height: "20px",
  position: "absolute",
  top: "30%",
  transform: "translateY(-50%)",
  right: "0.5rem",
  cursor: "pointer",
});

const Container = styled("div", {
  position: "sticky",
  height: "56px",
  paddingBottom: "1.5rem",
  width: "100%",
  top: "0",
  zIndex: "5",
  background: "var(--ddocs-colors-backgroundPrimary)",
});

const Searchbar: FunctionComponent<SearchbarProps> = ({
  onSearch,
  onChange,
  loading,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(v) => setValue(v.currentTarget.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (onSearch) onSearch(value);
          }
        }}
      />
      {!loading ? (
        <Icon
          onClick={() => {
            if (onSearch) onSearch(value);
          }}
          viewBox="0 0 30.239 30.239"
        >
          <path
            d="M20.194,3.46c-4.613-4.613-12.121-4.613-16.734,0c-4.612,4.614-4.612,12.121,0,16.735
		c4.108,4.107,10.506,4.547,15.116,1.34c0.097,0.459,0.319,0.897,0.676,1.254l6.718,6.718c0.979,0.977,2.561,0.977,3.535,0
		c0.978-0.978,0.978-2.56,0-3.535l-6.718-6.72c-0.355-0.354-0.794-0.577-1.253-0.674C24.743,13.967,24.303,7.57,20.194,3.46z
		 M18.073,18.074c-3.444,3.444-9.049,3.444-12.492,0c-3.442-3.444-3.442-9.048,0-12.492c3.443-3.443,9.048-3.443,12.492,0
		C21.517,9.026,21.517,14.63,18.073,18.074z"
          />
        </Icon>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default Searchbar;
