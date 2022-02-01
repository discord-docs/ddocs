import Author from "./author";
import Summary from "./summary";

export default interface Event {
  id: string;
  author: Author;
  contributors: Author[];
  summaries: Summary[];
  title: string;
  description?: string;
  thumbnail?: string;
  heldAt: string;
}
