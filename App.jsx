import React from "react"
import OpenScreen from "./components/OpenScreen"
import EndScreen from "./components/EndScreen"
import QuizScreen from "./components/QuizScreen"


export default function App() { 
    
    const [openScreen, setOpenScreen] = React.useState(true)
    const [endScreen, setEndScreen] = React.useState(false)

    
    function startGame() {
        setOpenScreen(prevOpenScreen => !prevOpenScreen)
    }
    
    function endGame() {
        setEndScreen(prevEndScreen => !prevEndScreen)
    }
    
    
    
    return ( 
        <main>
            {openScreen && <OpenScreen handleClick={startGame}/>}
            {!openScreen && <QuizScreen handleClick={endGame}/>} 
            {endScreen && <EndScreen />}
        </main>     
    )
}