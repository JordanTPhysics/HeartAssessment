import React from "react";

import Question from "@/src/components/Question";
import { QuestionModel } from "../models/question";
import QuestionBox from "./ui/questionbox";

import { GiHeartOrgan, GiShatteredHeart, GiWrappedHeart, GiBrain } from "react-icons/gi";
import { FaBalanceScale, FaBalanceScaleLeft, FaBalanceScaleRight } from "react-icons/fa";

import useMediaQuery from "../lib/media-query";

type MainPageProps = {
    questions: QuestionModel[];
    onUpdateIndex: (idx: number) => void;
};

const renderScales = (questions: QuestionModel[], size: number) => {
    const averageScore = calculateAverage(questions);

    if (averageScore < 3) {
        return <FaBalanceScaleLeft size={size} color="red"/>;
    } else if (averageScore > 7) {
        return <FaBalanceScaleRight size={size} color="green" />;
    } else {
        return <FaBalanceScale size={size} color="white" />;
    }
};

const calculateAverage = (questions: QuestionModel[]) => {
    return questions.reduce((acc, question) => acc + question.score, 0) / questions.length;
}


const MainPage = ({ questions, onUpdateIndex }: MainPageProps) => {

    const size = useMediaQuery('(min-width: 640px)') ? 200 : 50;

    const faithQuestions = questions.filter((question) => question.category === "Faith");
    const practiceQuestions = questions.filter((question) => question.category !== "Faith");

    return (
        <div>
            <h1 className="text-3xl">Complete all of the questions to see your results</h1>
            <div className="grid lg:grid-cols-3 grid-cols-1">
                <div className="col-span-1">
                {faithQuestions.map((question, idx) => {
                    return <div key={question.questionNo}>
                        <QuestionBox question={question} onUpdateIndex={onUpdateIndex} />
                    </div>;
                })}
                </div>
                <div className="col-span-1 align-center items-center flex flex-col">
                    <GiHeartOrgan size={size} color="red" className="m-4"/>
                    <GiWrappedHeart size={size} color="magenta" className="m-4"/>
                    <GiShatteredHeart size={size} color="violet" className="m-4"/>
                    <GiBrain size={size} color="teal" className="m-4"/>
                    {renderScales(questions, size)}
                </div>
                <div className="col-span-1">
                {practiceQuestions.map((question, idx) => {
                    return <div key={question.questionNo}>
                        <QuestionBox question={question} onUpdateIndex={onUpdateIndex} />
                            
                    </div>;
                })}
                </div>

            </div>
        </div>
    );
};

export default MainPage;