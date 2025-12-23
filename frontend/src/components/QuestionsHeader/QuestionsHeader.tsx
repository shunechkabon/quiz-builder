import s from './QuestionsHeader.module.css';

type Props = {
    onAdd: () => void;
};

const QuestionsHeader = ({ onAdd }: Props) => {
    return (
        <div className={s.questionsHeader}>
            <h3>Questions</h3>
            <button type="button" onClick={onAdd}>
                + Add question
            </button>
        </div>
    );
};

export default QuestionsHeader;
