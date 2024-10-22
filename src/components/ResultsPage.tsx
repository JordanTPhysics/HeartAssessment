import React from 'react';
import { QuestionModel, totalScores } from '../models/question';
import PdfWriter from './PdfWriter';

interface ResultsPageProps {
    questions: QuestionModel[];
}

const getMaxScores = (questions: QuestionModel[]) => {
    let maxScores: { [key: string]: number } = {};
    questions.forEach((question) => {
        for (const cat of question.category.split(", ")) {
            if (!maxScores[cat]) {
                maxScores[cat] = 10;
            } else {
                maxScores[cat] += 10;
            }
        }
        if (!maxScores["Total"]) {
            maxScores["Total"] = 10;
        } else {
            maxScores["Total"] += 10;
        }
    });

    return maxScores;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ questions }: ResultsPageProps) => {

    const onRetry = () => {
        window.location.reload();
    }

    const scores = totalScores(questions);
    const maxScores = getMaxScores(questions);
    const categories = Object.keys(scores).sort((a, b) => {
        if (a === "Total") return -1;
        if (b === "Total") return 1;
        return 0;
    });
    const percentageScores = categories.map((key) => (scores[key] / maxScores[key] * 100).toFixed(0));
    

    return (
        <div>
            <h1>Quiz Results</h1>
            <span className='text-text lg:text-2xl md:text-1xl text-lg'>A high score indicates a spiritually and mentally healthy heart. A low score in a particular area may indicate an area for improvement.</span>
            <PdfWriter labels={categories} data={percentageScores.map((score) => parseInt(score))} />
            <button className='bg-foreground' onClick={onRetry}>Retry Self-Assessment</button>
        </div>
    );
};

export default ResultsPage;