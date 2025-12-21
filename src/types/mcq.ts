export interface Choice {
  id: string;
  text: string;
  is_correct: boolean;
}

export interface Question {
  id: string;
  source_document: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  choices: Choice[];
  multiple_answers?: boolean;
  chapter?: string; // Add optional chapter field
}

export interface MCQData {
  metadata: {
    domain: string;
    source: string;
    documents_processed: number;
    questions_per_document: number;
    total_questions: number;
  };
  questions: Question[];
}
