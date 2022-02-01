export default interface Summary {
  id: string;
  title: string;
  content?: string;
  type: "feature" | "qnaanswer";
  isNew: boolean;
  thumbnail?: string;
  featureType?:
    | "plannedq1"
    | "plannedq2"
    | "plannedq3"
    | "plannedq4"
    | "unknown"
    | "closedbeta"
    | "workinprogress"
    | "released";
}
