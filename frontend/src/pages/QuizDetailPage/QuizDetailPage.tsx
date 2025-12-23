import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuizById } from '../../services/quizzes.service';
import type { Quiz } from '../../types/quiz';
import s from './QuizDetailPage.module.css';

const QuizDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const load = async () => {
            try {
                setError(null);
                const data = await getQuizById(id);
                setQuiz(data);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Failed to load quiz');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id]);

    if (loading) {
        return <p className={s.state}>Loading…</p>;
    }

    if (error) {
        return (
            <div className={s.state}>
                <p className={s.error}>{error}</p>
                <Link to="/quizzes">← Back to quizzes</Link>
            </div>
        );
    }

    if (!quiz) {
        return <p className={s.state}>Quiz not found</p>;
    }

    return (
        <div className={s.page}>
            <Link to="/quizzes" className={s.back}>
                ← Back
            </Link>

            <h2 className={s.title}>{quiz.title}</h2>

            <ul className={s.questions}>
                {quiz.questions.map((q, index) => (
                    <li key={q.id} className={s.question}>
                        <p className={s.questionTitle}>
                            {index + 1}. {q.text}
                        </p>

                        {q.type === 'BOOLEAN' && (
                            <p className={s.meta}>Type: Boolean (True / False)</p>
                        )}

                        {q.type === 'INPUT' && (
                            <p className={s.meta}>Type: Input (short text)</p>
                        )}

                        {q.type === 'CHECKBOX' && (
                            <>
                                <p className={s.meta}>Type: Checkbox</p>
                                <ul className={s.options}>
                                    {q.options.map((opt) => (
                                        <li key={opt.id} className={s.option}>
                                            {opt.text}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizDetailPage;
