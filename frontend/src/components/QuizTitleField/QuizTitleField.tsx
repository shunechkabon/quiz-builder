import type { FieldError, UseFormRegister } from 'react-hook-form';
import type { CreateQuizForm } from '../../pages/QuizCreationPage/QuizCreationPage.types';
import s from './QuizTitleField.module.css';

type Props = {
    register: UseFormRegister<CreateQuizForm>;
    error?: FieldError;
};

const QuizTitleField = ({ register, error }: Props) => {
    return (
        <>
            <label className={s.field}>
                <span>Quiz title</span>
                <input
                    {...register('title', { required: 'Quiz title is required.' })}
                    placeholder="e.g. JavaScript basics"
                />
            </label>

            {error && <p className={s.error}>{error.message}</p>}
        </>
    );
};

export default QuizTitleField;
