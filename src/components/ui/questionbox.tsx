import { QuestionModel } from "@/src/models/question";
import React from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

type QuestionBoxProps = {
    question: QuestionModel;
    onUpdateIndex: (idx: number) => void;
};

const QuestionBox: React.FC<QuestionBoxProps> = ({ question, onUpdateIndex }) => {

    const onUpdate = () => {
        onUpdateIndex(question.questionNo);
    };

    return (
        <div className="flex flex-row items-center align-middle justify-evenly m-1 border-2 rounded-md bg-foreground">
            {question.isAnswered ? <MdCheckBox color="green" size={40}/> : <MdCheckBoxOutlineBlank color="gray" size={40}/>}
            <button onClick={onUpdate}>{question.name}</button>

        </div>
    );
};

export default QuestionBox;