import { useEffect } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createQuiz } from '../../services/quizzes.service';
import { makeId } from '../../utils/id';
import type { CreateQuizForm, QuestionType } from './QuizCreationPage.types';
import type { CreateQuizPayload, Question } from '../../types/quiz';
import s from './QuizCreationPage.module.css';
import QuizTitleField from '../../components/QuizTitleField/QuizTitleField';
import QuestionsHeader from '../../components/QuestionsHeader/QuestionsHeader';
import QuestionCard from '../../components/QuestionCard/QuestionCard';

const makeDefaultQuestion = (): CreateQuizForm['questions'][number] => {
    return {
        id: makeId(),
        text: '',
        type: 'boolean',
        booleanCorrect: undefined,
        inputCorrect: undefined,
        options: undefined,
    };
};

const makeDefaultCheckboxOptions = (): NonNullable<
    CreateQuizForm['questions'][number]['options']
> => {
    return [
        { id: makeId(), text: '', isCorrect: false },
        { id: makeId(), text: '', isCorrect: false },
    ];
};

const QuizCreationPage = () => {
    const navigate = useNavigate();

    const {
        register,
        control,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<CreateQuizForm>({
        defaultValues: {
            title: '',
            questions: [makeDefaultQuestion()],
        },
        mode: 'onSubmit',
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions',
        keyName: 'key',
    });

    const questions = useWatch({ control, name: 'questions' });

    useEffect(() => {
        if (!questions?.length) return;

        questions.forEach((q, index) => {
            if (q.type === 'checkbox') {
                const opts = q.options ?? [];
                if (opts.length < 2) {
                    setValue(`questions.${index}.options`, makeDefaultCheckboxOptions(), {
                        shouldDirty: true,
                    });
                }

                if (q.booleanCorrect) {
                    setValue(`questions.${index}.booleanCorrect`, undefined, { shouldDirty: true });
                }
                if (q.inputCorrect) {
                    setValue(`questions.${index}.inputCorrect`, undefined, { shouldDirty: true });
                }

                return;
            }

            if (q.options?.length) {
                setValue(`questions.${index}.options`, undefined, { shouldDirty: true });
            }

            if (q.type === 'boolean') {
                if (q.inputCorrect) {
                    setValue(`questions.${index}.inputCorrect`, undefined, { shouldDirty: true });
                }
                return;
            }

            if (q.booleanCorrect) {
                setValue(`questions.${index}.booleanCorrect`, undefined, { shouldDirty: true });
            }
        });
    }, [questions, setValue]);

    const onSubmit = async (data: CreateQuizForm) => {
        clearErrors('root');

        if (!data.title.trim()) {
            setError('title', { message: 'Quiz title is required.' });
            return;
        }

        if (!data.questions.length) {
            setError('root', { message: 'Add at least one question.' });
            return;
        }

        for (const [i, q] of data.questions.entries()) {
            if (!q.text.trim()) {
                setError('root', { message: `Question ${i + 1}: text is required.` });
                return;
            }

            if (q.type === 'boolean' && !q.booleanCorrect) {
                setError('root', { message: `Question ${i + 1}: select correct True/False.` });
                return;
            }

            if (q.type === 'input' && !q.inputCorrect?.trim()) {
                setError('root', { message: `Question ${i + 1}: correct answer is required.` });
                return;
            }

            if (q.type === 'checkbox') {
                const opts = q.options ?? [];

                if (opts.length < 2) {
                    setError('root', { message: `Question ${i + 1}: at least 2 options.` });
                    return;
                }
                if (opts.some((o) => !o.text.trim())) {
                    setError('root', { message: `Question ${i + 1}: each option needs text.` });
                    return;
                }
                if (!opts.some((o) => o.isCorrect)) {
                    setError('root', { message: `Question ${i + 1}: mark at least one correct option.` });
                    return;
                }
            }
        }

        const payload: CreateQuizPayload = {
            title: data.title.trim(),
            questions: data.questions.map((q): Question => {
                if (q.type === 'boolean') {
                    return {
                        id: q.id,
                        type: 'BOOLEAN',
                        text: q.text.trim(),
                        correctAnswer: q.booleanCorrect === 'true',
                    };
                }

                if (q.type === 'input') {
                    return {
                        id: q.id,
                        type: 'INPUT',
                        text: q.text.trim(),
                        correctAnswer: q.inputCorrect?.trim() ?? '',
                    };
                }

                return {
                    id: q.id,
                    type: 'CHECKBOX',
                    text: q.text.trim(),
                    options: (q.options ?? []).map((o) => ({
                        id: o.id,
                        text: o.text.trim(),
                        isCorrect: o.isCorrect,
                    })),
                };
            }),
        };

        try {
            await createQuiz(payload);
            navigate('/quizzes');
        } catch (e) {
            setError('root', {
                message: e instanceof Error ? e.message : 'Failed to create quiz.',
            });
        }
    };

    return (
        <div className={s.page}>
            <h2>Create quiz</h2>

            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <QuizTitleField register={register} error={errors.title} />

                <QuestionsHeader onAdd={() => append(makeDefaultQuestion())} />

                <div className={s.questions}>
                    {fields.map((f, index) => {
                        const type = (questions[index]?.type ?? 'boolean') as QuestionType;

                        return (
                            <QuestionCard
                                key={f.key}
                                control={control}
                                register={register}
                                index={index}
                                type={type}
                                onRemove={() => remove(index)}
                            />
                        );
                    })}
                </div>

                {errors.root?.message && <p className={s.error}>{errors.root.message}</p>}

                <button className={s.submitBtn} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving…' : 'Create quiz'}
                </button>
            </form>
        </div>
    );
};

export default QuizCreationPage;
