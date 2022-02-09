import { FunctionComponent } from "react";
import Author from "../../../lib/api-models/author";
import { styled } from "../../../stitches.config";
import GracefulImage from "../../util/GracefulImage";

interface ContributorProps {
  contributor: Author;
  targetRef: React.Ref<HTMLAnchorElement>;
}

const ContributorContainer = styled("a", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  borderRadius: "16px",
  backgroundColor: "$backgroundAccent",
});

const Contributor: FunctionComponent<ContributorProps> = ({
  targetRef,
  contributor,
}) => {
  return (
    <ContributorContainer
      ref={targetRef}
      href={`discord://-/users/${contributor.id}`}
    >
      <GracefulImage
        id={contributor.avatar}
        width={32}
        height={32}
        style={{
          borderRadius: "16px",
          margin: "0 0.25rem",
        }}
      />
    </ContributorContainer>
  );
};

export default Contributor;
