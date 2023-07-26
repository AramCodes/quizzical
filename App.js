import React from "react"
import MainScreen from "./components/MainScreen"
import QuizScreen from "./components/QuizScreen"

export default function App() {
    
    const [mainScreen, setMainScreen] = React.useState(true)

    
    
    function switchScreen() {
        setMainScreen(prevMainScreen => !prevMainScreen)
    }
    
    function startGame() {
        switchScreen()
    }
    

    return (
            <main>
                {mainScreen && <MainScreen handleClick={startGame}/>}
                {!mainScreen && <QuizScreen />} 
            </main>     
    )
}

//props questions are sent to QuizScreen