import { Word } from "./words_objects";

export interface QuizQuestion {
    id: number;
    targetWord: Word;
    options: Word[];
}

export interface UserAnswer {
    questionId: number;
    selectedOptionId: number;
    isCorrect: boolean;
}

export interface QuizState {
    questions: QuizQuestion[];
    currentQuestionIndex: number;
    score: number;
    isFinished: boolean;
    userAnswers: Record<string, number>;
}