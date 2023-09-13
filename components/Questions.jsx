import React from "react";
import SingleQuestion from "./SingleQuestion";

export default function Questions() {
    const [questions, setQuestions] = React.useState([]);  // state for questions returned from API
    const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([]); //restructuring Q&A
    const [showWarning, setShowWarning] = React.useState(false);//all questions must be answered
    const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0); // keeps number of correct
    const [showResult, setShowResult] = React.useState(false);//shows results
    
    //APi call to get questions and set state also wrapped in useeffect to prven collisioon or loops
    React.useEffect(() => {
        if (questions.length === 0) {
            fetch("https://opentdb.com/api.php?amount=5")
                .then((response) => response.json())
                . then((data) => {
                setQuestions(data.results);
          // each item in questionsAndAnswers will be an object of:
          /*
            -question
            -shuffled answers
            -correct answer
            -selected answer
          */
                setQuestionsAndAnswers(
                    data.results.map((questionObject) => {
                        return {
                        question: questionObject.question,
                        shuffledAnswers: shuffle([
                        ...questionObject.incorrect_answers,
                        questionObject.correct_answer
                        ]),
                        correctAnswer: questionObject.correct_answer,
                        selectedAnswer: ""
                        };
                    })
                );
            });
        }
        
    }, [questions]);
    
    
     //uses shuffle algo to randomize array found on stack overflow by superluminary
    function shuffle(array){
        return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    } 
    
    //selects an answer and deselect previous button selected
function updateAnswer(currentQuestion, answer) {
    setQuestionsAndAnswers(
      questionsAndAnswers.map((questionObject) => {
        // if it is the question being answered, update its selected answer
        return questionObject.question === currentQuestion
          ? { ...questionObject, selectedAnswer: answer }
          : questionObject;
        })
      );
     }
     
     //makes sure each question has a selected answer
    function checkAnswers() {
        const notAllAnswered = questionsAndAnswers.some(
            (questionObject) => questionObject.selectedAnswer === ""
        );
        
        setShowWarning(notAllAnswered);
        
        if (!notAllAnswered) {
            questionsAndAnswers.forEach((questionObject) => {
                if (questionObject.selectedAnswer === questionObject.correctAnswer) {
                setNumCorrectAnswers( (prevNumCorrectAnswers) => prevNumCorrectAnswers + 1);
        }
      });  
    
      setShowResult(true);
      }
    }

    //reset
    function playAgain() {
    // reset all states
    setQuestions([]);
    setQuestionsAndAnswers([]);
    setShowResult(false);
    setNumCorrectAnswers(0);
    }
    
    const questionsElements = questionsAndAnswers.map((questionObject, index) => {
    return (
      <SingleQuestion
        key={index}
        question={questionObject.question}
        allAnswers={questionObject.shuffledAnswers}
        selectedAnswer={questionObject.selectedAnswer}
        correctAnswer={questionObject.correctAnswer}
        showResult={showResult}
        updateAnswer={updateAnswer}
      />
    );
  });

  return (
    <div>
      <div className="questions-container">{questionsElements}</div>

      <div className="text-center">
        {showWarning && (
          <p className="warning-message">
            You have not answered all questions
          </p>
        )}

        {/* questions.length > 0 means showing the button when the data is available */}
        {questions.length > 0 && !showResult ? (
          <button className="check-btn" onClick={checkAnswers}>
            Check answers
          </button>
        ) : null}
      </div>

      {showResult && (
        <div className="result-container">
          <p className="result-message">
            You scored {numCorrectAnswers}/5 correct answers
          </p>
          <button className="play-again-btn" onClick={playAgain}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
   
}
