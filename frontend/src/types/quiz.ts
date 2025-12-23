export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export type Quiz = {
    id: string;
    title: string;
    questions: Question[];
};

export type QuizListItem = {
    id: string;
    title: string;
    questionCount: number;
};

export type BooleanQuestion = {
    id: string;
    type: 'BOOLEAN';
    text: string;
    correctAnswer: boolean | null;
};

export type InputQuestion = {
    id: string;
    type: 'INPUT';
    text: string;
    correctAnswer: string;
};

export type CheckboxOption = {
    id: string;
    text: string;
    isCorrect: boolean;
};

export type CheckboxQuestion = {
    id: string;
    type: 'CHECKBOX';
    text: string;
    options: CheckboxOption[];
};

export type Question = BooleanQuestion | InputQuestion | CheckboxQuestion;

export type CreateQuizPayload = {
    title: string;
    questions: Question[];
};
