import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteQuiz, getQuizzes } from '../../services/quizzes.service';
import type { QuizListItem } from '../../types/quiz';
import s from './QuizListPage.module.css';

const QuizListPage = () => {
    const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            try {
                setError(null);
                setIsLoading(true);

                const data = await getQuizzes();
                if (!isMounted) return;

                setQuizzes(data);
            } catch (e) {
                if (!isMounted) return;
                setError(e instanceof Error ? e.message : 'Failed to load quizzes.');
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        load();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleDelete = async (id: string) => {
        try {
            setError(null);
            setDeletingId(id);

            await deleteQuiz(id);

            setQuizzes((prev) => prev.filter((q) => q.id !== id));
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to delete quiz.');
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className={s.page}>
                <h2>Quizzes</h2>
                <p>Loading…</p>
            </div>
        );
    }

    return (
        <div className={s.page}>
            <h2>Quizzes</h2>

            {error && <p className={s.error}>{error}</p>}

            {!quizzes.length ? (
                <p>
                    No quizzes yet. Go to <Link to="/create">Create</Link>.
                </p>
            ) : (
                <ul className={s.list}>
                    {quizzes.map((q) => (
                        <li key={q.id} className={s.item}>
                            <Link to={`/quizzes/${q.id}`} className={s.link}>
                                <div className={s.titleRow}>
                                    <strong className={s.title}>{q.title}</strong>
                                    <span className={s.meta}>{q.questionCount} questions</span>
                                </div>
                            </Link>

                            <button
                                type="button"
                                className={s.deleteBtn}
                                onClick={() => handleDelete(q.id)}
                                disabled={deletingId === q.id}
                                aria-label="Delete quiz"
                                title="Delete quiz"
                            >
                                {deletingId === q.id ? '…' : '🗑️'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QuizListPage;
