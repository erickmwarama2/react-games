import React, { Component } from "react";
import './App.css';

export default class Quiz extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questions : [
                {
                    question: "What animal barks?",
                    possibleAnswers: ["Dog", "Cat"],
                    rightAnswer: "Dog",
                    playerChoice: null
                },
                {
                    question: "What animal is more closely related to a tiger?",
                    possibleAnswers: ["Dog", "Cat"],
                    rightAnswer: "Cat",
                    playerChoice: null
                },
                {
                    question: "What animal is more closely related to a wolf?",
                    possibleAnswers: ["Dog", "Cat"],
                    rightAnswer: "Dog",
                    playerChoice: null
                },
                {
                    question: "What animal is best for playing fetch?",
                    possibleAnswers: ["Dog", "Cat"],
                    rightAnswer: "Dog",
                    playerChoice: null
                }
                
            ]
        };

        this.answerQuestion = this.answerQuestion.bind(this);
    }

    displayResult(index) {
        const question = this.state.questions[index];
        if(!question.playerChoice) {
            return;
        }

        if(question.playerChoice === question.rightAnswer) {
            return (
                <p className="result-correct">
                    Your answer is correct!
                </p>
            );
        }else {
            return (
                <p className="result-incorrect">
                    Your answer is incorrect!
                </p>
            );
        }
    }

    updatePlayerScore() {
        const playerScore = this.state.questions.filter(q => q.rightAnswer === q.playerChoice).length;
        this.setState({playerScore});
        console.log("New Player score: ", playerScore);
    }

    displayQuestion(index) {
        const question = this.state.questions[index];
        
        return (
            <div className="question-display" key={`q-${index}`}>
                <p className="question">
                    {question.question}
                </p>
                <br/>
                {question.possibleAnswers.map((answer, answerIndex) => (
                    <button key={`q-${index}-a-${answerIndex}`} className="question-choice" onClick={() => this.answerQuestion(index, answer)}>
                        {answer}
                    </button>
                ))}
                
                <br/>
                {this.displayResult(index)}
                
            </div>
        );
    }

    answerQuestion(index, choice) {
        const answeredQuestion = this.state.questions[index];
        answeredQuestion.playerChoice = choice;
        const allQuestions = this.state.questions;
        allQuestions[index] = answeredQuestion;

        this.setState({
            questions: allQuestions
        }, () => {
            this.updatePlayerScore();
        });
    }

    render() {
        return (
            <div className="App">
                <h1> Quiz Show! </h1>
                <hr/>

                {this.state.questions.map((question, index) => this.displayQuestion(index))}
                
                
            </div>
        );
    }
}