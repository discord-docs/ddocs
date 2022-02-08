import Author from "./author";
import Summary from "./summary";

export interface Draft {
  id: string;
  title: string;
  description: string;
  heldAt: string;
  author: Author;
  contributors: Author[];
  thumbnail?: string;
  summaries: Summary[];
}
