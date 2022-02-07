import { FunctionComponent } from "react";
import PartialEvent from "../../../lib/api-models/partialEvent";
import { styled } from "../../../stitches.config";
import Panel from "../../util/Panel";
import Text from "../../typography/Text";

interface SidebarEventCardProps {
  event: PartialEvent;
}

const Header = styled("header", {
  fontWeight: "700",
  fontSize: 20,
  marginBottom: "0.25rem",
});

const Image = styled("img", {
  width: "100%",
});

const Padding = styled("div", {
  padding: 12,
});

const SidebarEventCard: FunctionComponent<SidebarEventCardProps> = ({
  event,
}) => {
  return (
    <Panel color={"dark"} padding="nopad">
      <Image src={event.thumbnail} />
      <Padding>
        <Header>{event.title}</Header>
        <Text size={"normal"}>{event.description}</Text>
      </Padding>
    </Panel>
  );
};

export default SidebarEventCard;
