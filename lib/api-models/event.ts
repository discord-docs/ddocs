import Author from "./author";
import PartialEvent from "./partialEvent";
import Summary from "./summary";

export default interface Event extends PartialEvent {
  author: Author;
  contributors: Author[];
  summaries: Summary[];
}
