export type QuestionType = 'boolean' | 'input' | 'checkbox';

export type CheckboxOptionForm = {
    id: string;
    text: string;
    isCorrect: boolean;
};

export type QuestionForm = {
    id: string;
    text: string;
    type: QuestionType;
    booleanCorrect?: 'true' | 'false';
    inputCorrect?: string;
    options?: CheckboxOptionForm[];
};

export type CreateQuizForm = {
    title: string;
    questions: QuestionForm[];
};
