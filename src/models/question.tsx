import { labelSets } from "./labelsets";

export interface QuestionModel {
    questionNo: number;
    question: string;
    labels: string[];
    isAnswered: boolean;
    onAnswered: (score: number) => void;
    score: number;
    positive?: boolean;
    name: string;
    category: string;
}

export class Question implements QuestionModel {
    questionNo: number;
    question: string;
    labels: string[];
    isAnswered: boolean;
    onAnswered: (score: number) => void;
    score: number;
    category: string;
    name: string;
    positive?: boolean;

    constructor(
        questionNo: number,
        question: string,
        labels: string[],
        onAnswered: (score: number) => void,
        category: string,
        name: string,
        positive?: boolean
    ) {
        this.questionNo = questionNo;
        this.question = question;
        this.labels = labels;
        this.positive = positive || false;
        this.category = category || "";
        this.isAnswered = false;
        this.onAnswered = onAnswered;
        this.name = name;
        this.score = 5;
    }
}
export const totalScores: (questions: QuestionModel[]) => { [key: string]: number } = (questions: QuestionModel[]) => {
    let scores: { [key: string]: number } = {};
    
    questions.forEach((question) => {
        let score = question.positive ? question.score : 10 - question.score;
        for (const cat of question.category.split(", ")) {
            if (!scores[cat]) {
                scores[cat] = score;
            } else {
                scores[cat] += score;
            }
        }
        if (!scores["Total"]) {
            scores["Total"] = score;
        } else {
            scores["Total"] += score;
        }
    });

    return scores;
};

export const questionsInitialState: Question[] = [
    new Question(1, "I believe in God, the Creator of Heavens and Earth", labelSets.belief, (score: number) => { }, "Faith", "Creator", true),
    new Question(2, "I believe that God has sent messengers to mankind", labelSets.belief, (score: number) => { }, "Faith", "Messengers", true),
    new Question(3, "I believe that God has sent scripture to mankind", labelSets.belief, (score: number) => { }, "Faith","Scripture", true),
    new Question(4, "I believe in the Day of Judgement", labelSets.belief, (score: number) => { }, "Faith","Day of Accounts", true),
    new Question(5, "I believe in the Angels", labelSets.belief, (score: number) => { }, "Faith", "Angels", true),
    new Question(6, "I believe in the Hereafter", labelSets.belief, (score: number) => { }, "Faith", "Hereafter", true),
    new Question(7, "I make/have made a testimony of faith", labelSets.frequency, (score: number) => { }, "Faith", "Testimony", true),
    new Question(8, "I pray and worship God regularly", labelSets.frequency, (score: number) => { }, "Faith", "Prayer", true),
    new Question(9, "I practice fasting to attain closeness to God", labelSets.frequency, (score: number) => { }, "Faith", "Fasting", true),
    new Question(10, "I give to charity for the sake of God and not to please others", labelSets.frequency, (score: number) => { }, "Faith", "Charity", true),
    new Question(11, "I believe that God is the One who decides what happens for me", labelSets.belief, (score: number) => { }, "Faith", "Destiny", true),
    new Question(12, "I have been on Pilgrimage/Intention to go on Pilgrimage", labelSets.truthiness, (score: number) => { }, "Faith", "Pilgrimage", true),
    new Question(13, "I am conscious of God in all of my actions", labelSets.frequency, (score: number) => { }, "Faith", "God Consciousness", true),
    new Question(14, "I believe in the Oneness of God", labelSets.belief, (score: number) => { }, "Faith", "Monotheism", true),
    new Question(15, "I believe God cannot be resembled by his creation", labelSets.belief, (score: number) => { }, "Faith", "Eternal Sovereignity", true),

    new Question(16, "I like to tell people about my achievements.", labelSets.frequency, (score: number) => { }, "Showing Off", "Achievements"),
    new Question(17, "I care a lot about what other people think of me.", labelSets.agreement, (score: number) => { }, "Love of Leaderhip, Pride", "Opinion of Others"),
    new Question(18, "I am grateful for things that are given (healthy body, food, water, etc.)", labelSets.agreement, (score: number) => { }, "Love of World", "Gratitude", true),
    new Question(19, "I am careful with the things that come from my mouth, especially when speaking about others", labelSets.frequency, (score: number) => { }, "Backbiting, Lying", "Gossiping", true),
    new Question(20, "I consider carefully the people I choose to spend time with", labelSets.frequency, (score: number) => { }, "Heedlessness, Backbiting", "Self-Consciousness", true),
    new Question(21, "I engage in excercising the body", labelSets.frequency, (score: number) => { }, "Heedlessness", "Excercise", true),
    new Question(22, "I engage in activities that I know are bad for my physical health", labelSets.frequency, (score: number) => { }, "Heedlessness, Showing Off", "Body Health"),
    new Question(23, "I find it easy to part with my wealth", labelSets.difficulty, (score: number) => { }, "Love of World, Greed", "Wealth & Material", true),
    new Question(24, "I criticize other people for actions I find myself doing at times", labelSets.likelihood, (score: number) => { }, "Hypocrisy", "Double Standards" ,true),
    new Question(25, "I act differently depending on who I'm with", labelSets.likelihood, (score: number) => { }, "Hypocrisy, Backbiting", "Context Group"),
    new Question(26, "I am grateful for the material wealth I have", labelSets.agreement, (score: number) => { }, "Love of World, Pride", "Wealth & Material", true),
    new Question(27, "I will forgive someone who wrongs me", labelSets.likelihood, (score: number) => { }, "Hatred, Pride", "Forgiveness", true),
    new Question(28, "I think anyone who sincerely asks for forgiveness should get it", labelSets.likelihood, (score: number) => { }, "Hatred", "Forgiveness", true),
    new Question(29, "I think I am better than the average person", labelSets.likelihood, (score: number) => { }, "Pride, Hatred", "Self-Image"),
    new Question(30, "I always fulfil the promises that I make", labelSets.frequency, (score: number) => { }, "Heedlessness, Lying", "Honesty"),
];
