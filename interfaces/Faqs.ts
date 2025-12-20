export interface FaqItem {
  id: number;
  question: string;
  status: "Published" | "Draft"
};