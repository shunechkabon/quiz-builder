import type { CreateQuizPayload, Quiz, QuizListItem } from '../types/quiz';

const BASE_URL = '/api';

export const getQuizzes = async (): Promise<QuizListItem[]> => {
    const res = await fetch(`${BASE_URL}/quizzes`);

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`GET /quizzes failed: ${res.status}. ${text}`);
    }

    return (await res.json()) as QuizListItem[];
};

export const getQuizById = async (id: string): Promise<Quiz> => {
    const res = await fetch(`${BASE_URL}/quizzes/${id}`);

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`GET /quizzes/:id failed: ${res.status}. ${text}`);
    }

    return (await res.json()) as Quiz;
};

export const createQuiz = async (payload: CreateQuizPayload): Promise<Quiz> => {
    const res = await fetch(`${BASE_URL}/quizzes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`POST /quizzes failed: ${res.status}. ${text}`);
    }

    return (await res.json()) as Quiz;
};

export const deleteQuiz = async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/quizzes/${id}`, { method: 'DELETE' });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`DELETE /quizzes/:id failed: ${res.status}. ${text}`);
    }
};
