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
  chapter?: string;
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

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  questionsCount: number;
  color: string;
  dataFile: string;
}

export interface ModuleList {
  modules: Module[];
}
