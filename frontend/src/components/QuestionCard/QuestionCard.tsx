import type { Control, UseFormRegister } from 'react-hook-form';
import CheckboxOptions from '../CheckboxOptions/CheckboxOptions';
import type { CreateQuizForm, QuestionType } from '../../pages/QuizCreationPage/QuizCreationPage.types';
import s from './QuestionCard.module.css';

type Props = {
    control: Control<CreateQuizForm>;
    register: UseFormRegister<CreateQuizForm>;
    index: number;
    type: QuestionType;
    onRemove: () => void;
};

const QuestionCard = ({ control, register, index, type, onRemove }: Props) => {
    return (
        <div className={s.card}>
            <div className={s.cardTop}>
                <strong>Question {index + 1}</strong>
                <button type="button" onClick={onRemove}>
                    Remove
                </button>
            </div>

            <label className={s.field}>
                <span>Text</span>
                <input {...register(`questions.${index}.text`)} />
            </label>

            <label className={s.field}>
                <span>Type</span>
                <select {...register(`questions.${index}.type`)}>
                    <option value="boolean">Boolean</option>
                    <option value="input">Input</option>
                    <option value="checkbox">Checkbox</option>
                </select>
            </label>

            <input type="hidden" {...register(`questions.${index}.id`)} />

            {type === 'boolean' && (
                <div className={s.block}>
                    <span>Correct answer</span>

                    <label className={s.inline}>
                        <input
                            type="radio"
                            value="true"
                            {...register(`questions.${index}.booleanCorrect`)}
                        />
                        True
                    </label>

                    <label className={s.inline}>
                        <input
                            type="radio"
                            value="false"
                            {...register(`questions.${index}.booleanCorrect`)}
                        />
                        False
                    </label>
                </div>
            )}

            {type === 'input' && (
                <label className={s.field}>
                    <span>Correct answer</span>
                    <input
                        {...register(`questions.${index}.inputCorrect`)}
                        placeholder="Short text answer"
                    />
                </label>
            )}

            {type === 'checkbox' && (
                <CheckboxOptions control={control} register={register} qIndex={index} />
            )}
        </div>
    );
};

export default QuestionCard;
