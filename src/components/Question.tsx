import React, { useState } from 'react';
import { Slider } from '../components/ui/slider';
import Tooltip from '../components/ui/tooltip';

interface QuestionProps {
    questionNo: number;
    question: string;
    name: string;
    labels: string[];
    onUpdateIndex: (value: number) => void;
    onAnswered: (score: number) => void;
    value: number;
    totalQuestions: number;
}

const Question: React.FC<QuestionProps> = ({ questionNo, question, name, labels, onUpdateIndex, value, totalQuestions, onAnswered }) => {

    const [score, setScore] = useState(value);
    const [animate, setAnimate] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleSliderChange = (newValue: number[]) => {
        setScore(newValue[0]);
    };

    const handleAnswered = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnimate(true);
        onAnswered(score);
        setDisabled(true);

        setTimeout(() => {
            setAnimate(false);
        }, 1000);
    }

    const handlePageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        setDisabled(false);
        setAnimate(false);

        const target = e.target as HTMLButtonElement;
        if (target.value === "Previous") {
            onUpdateIndex(questionNo - 1);
        } else if (target.value === "Return") {
            onUpdateIndex(-1);
        } else if (target.value === "Next") {
            onUpdateIndex(questionNo + 1);
        }
    }

    const nextDisabled = questionNo === totalQuestions;
    const previousDisabled = questionNo === 1;

    return (
        <div className={`lg:w-full align-middle sm:p-0 sm:m-0 md:m-2 md:p-2 lg:m-4 lg:p-4 rounded-md border-4 border-border bg-foreground shadow-xl ${animate ? 'animate' : ''}`}>
            <span className='lg:text-3xl md:text-2xl text-lg p-2 sm:p-0 sm:m-0'>{questionNo}: <Tooltip text={name} tooltipText='Placeholder'/>  - {question}</span>
            
            <div className='flex justify-between pb-4 pt-4'>
                {labels.map((label, index) => (
                    <span className='lg:text-3xl md:text-2xl text-lg p-1 sm:p-0 sm:m-0' key={index}>{label}</span>
                ))}
            </div>
            <Slider
                defaultValue={[value]}
                aria-labelledby="continuous-slider"
                min={1}
                max={10}
                step={1}
                onValueChange={handleSliderChange}
                tabIndex={0}
            />
            <button onClick={handlePageChange} value="Previous" disabled={previousDisabled} className={`mt-10 bg-danger  ${previousDisabled && 'opacity-40'}`}>Previous</button>
            <button onClick={handlePageChange} value="Next" disabled={nextDisabled} className={`mt-10 bg-success ${nextDisabled && 'opacity-40'}`}>Next</button>
            <button onClick={handleAnswered} value="Accept" disabled={disabled} className={`mt-10 bg-success ${disabled && 'opacity-40'}`}>Accept</button>
            <button onClick={handlePageChange} value="Return" className={`mt-10 bg-info ${animate ? 'animate' : ''}`}>Return</button>
        </div>
    );
};

export default Question;