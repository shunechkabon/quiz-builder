import { useFieldArray } from 'react-hook-form';
import type { Control, UseFormRegister } from 'react-hook-form';
import { makeId } from '../../utils/id';
import type { CreateQuizForm } from '../../pages/QuizCreationPage/QuizCreationPage.types';
import s from './CheckboxOptions.module.css';

type Props = {
    control: Control<CreateQuizForm>;
    register: UseFormRegister<CreateQuizForm>;
    qIndex: number;
};

const CheckboxOptions = ({ control, register, qIndex }: Props) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `questions.${qIndex}.options`,
        keyName: 'key',
    });

    return (
        <div className={s.block}>
            <div className={s.optionsHeader}>
                <span>Options</span>
                <button
                    type="button"
                    onClick={() => append({ id: makeId(), text: '', isCorrect: false })}
                >
                    + Add option
                </button>
            </div>

            <div className={s.options}>
                {fields.map((o, optIndex) => (
                    <div key={o.key} className={s.optionRow}>
                        <input
                            type="hidden"
                            {...register(`questions.${qIndex}.options.${optIndex}.id`)}
                        />

                        <input
                            placeholder="Option text"
                            {...register(`questions.${qIndex}.options.${optIndex}.text`)}
                        />

                        <label className={s.inline}>
                            <input
                                type="checkbox"
                                {...register(`questions.${qIndex}.options.${optIndex}.isCorrect`)}
                            />
                            Correct
                        </label>

                        <button
                            type="button"
                            onClick={() => remove(optIndex)}
                            disabled={fields.length <= 2}
                            title={fields.length <= 2 ? 'At least 2 options required' : 'Remove'}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckboxOptions;
