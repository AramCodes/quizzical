import React from "react"
import {decode} from 'html-entities';

export default function Question(props) {
    console.log(props.id)
    if(props.answers.length === 4) {
        return (
            <div className="question-container">
                <p className="question">{decode(props.question)}</p>
                    
                    
	            <input type="radio" id="option1" name={props.id} value="A" className="radio"></input>
                <label className="choice label-1" htmlFor="option1">{decode(props.answers[2])}</label>
        
                <input type="radio" id="option2" name={props.id} value="B" className="radio"></input>
                <label className="choice label-2" htmlFor="option2">{decode(props.answers[0])}</label>
        
                <input type="radio" id="option3" name={props.id} value="C" className="radio"></input>
                <label className="choice label-3" htmlFor="option3">{decode(props.answers[3])}</label>
        
                <input type="radio" id="option4" name={props.id} value="D" className="radio"></input>
                <label className="choice label-4" htmlFor="option4">{decode(props.answers[1])}</label>
            </div>
        )
    } 
    else {
                return (
            <div className="question-container">
                <p className="question">{decode(props.question)}</p>
                
	            <input type="radio" id="option1" name={props.id} value="first-option" className="radio"></input>
                <label className="choice label-1" htmlFor="option1">{decode(props.answers[0])}</label>
        
                <input type="radio" id="option2" name={props.id} value="second-option" className="radio"></input>
                <label className="choice label-2" htmlFor="option2">{decode(props.answers[1])}</label>
            </div>
        )
    }  
}

//Who is one of the most skilled juniors breaking into tech in 2023?
// Aram
// Aram
// Aram
// Aram