"use client";

import React, { useState, useEffect } from "react";

import { QuestionModel, questionsInitialState, totalScores, } from "../models/question";
import ThemeSwitcher from "../components/ThemeSwitcher";

import dynamic from "next/dynamic";

const Question = dynamic(() => import("../components/Question"), { ssr: false });
const MainPage = dynamic(() => import("../components/MainPage"), { ssr: false });
const ResultsPage = dynamic(() => import("../components/ResultsPage"), { ssr: false });

type HomeState = {
    page: number;
    questions: QuestionModel[];
    submitted: boolean;
}


class Home extends React.Component<{}, HomeState> {
    constructor(props: HomeState) {
        super(props);
        this.state = {
            page: -1,
            questions: questionsInitialState,
            submitted: false
        }
    }

    getQuestionComponent = (question: QuestionModel) => {
        return <Question
            questionNo={question.questionNo}
            question={question.question}
            name={question.name}
            labels={question.labels}
            totalQuestions={this.state.questions.length}
            onUpdateIndex={this.setPage}
            value={question.score}
            onAnswered={(score: number) => this.handleAnswered(question.questionNo, score)}
        />
    }

    renderComponent = () => {
        if(this.state.submitted) return <ResultsPage questions={this.state.questions} />;
        if (this.state.page >= 0) {
            return this.getQuestionComponent(this.state.questions[this.state.page - 1]);
        } else {
            return <MainPage questions={this.state.questions} onUpdateIndex={this.setPage} />;
        }
    }


    handleSubmitted = () => {
        this.setState({ submitted: true });
    }


    handleAnswered = (questionNo: number, score: number) => {
        this.setState((prevState) => {
            const updatedQuestions = prevState.questions.map((q) => {
              if (q.questionNo === questionNo) {
                return {
                  ...q,
                  score: score,
                  isAnswered: true
                };
              }
              return q;
            });
      
            return { questions: updatedQuestions };
          });
        };

    setPage = (page: number) => {
        this.setState({ page }, () => {
            console.log(this.state.page);
        });
    }

    resetQuestions = () => {
        confirm("Are you sure you want to reset the questions?");
        this.setState({ questions: questionsInitialState, page: -1, submitted: false });
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="bg-secondary lg:h-screen md:h-full sm:h-full text-text align-middle items-center text-center lg:p-20">
                <div className=" ">
                    <ThemeSwitcher />
                    <h1 className="lg:text-5xl md:text-3xl text-2xl text-text align-middle">Healthy Heart, Healthy Mind</h1>
                </div>
                <p className="lg:text-2xl md:text-1xl text-lg text-text align-middle">Rate yourself against diseases of the Heart!</p>
                <button onClick={this.resetQuestions} className="bg-foreground mt-10">Reset</button>

                { this.renderComponent() }
                <div>

                    {this.state.questions.filter((q: QuestionModel) => !q.isAnswered).length === 0 ? <button onClick={this.handleSubmitted} className="mt-10 bg-foreground ">Submit</button> : <></>}
                </div>
            </div>
        );
    }
}

export default Home;