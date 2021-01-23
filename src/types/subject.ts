export interface Answer {
  answer: string;
  correct: boolean;
}

export interface Comment {
  author: string;
  comment: string;
  date: string;
}

export interface Question {
  question: string;
  id: number;
  comments: Comment[]|null;
  answers: Answer[];
}

export interface Subject {
  title: string;
  id: string;
  data: Question[];
  updatedAt: number;
}
