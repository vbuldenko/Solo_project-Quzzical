import React from 'react'
import Questions from './components/Questions.jsx'
import StartPage from './components/StartPage.jsx'

export default function App() {
    const [start, setStart] = React.useState(false)
    const [categories, setCategories] = React.useState([])
    const [questionData, setQuestionData] = React.useState([])
    const [quizParameters, setQuizParameters] = React.useState({amount: 5, category: "", difficulty: "", type: "", token: ""})
    const [quizResults, setQuizResults] = React.useState({score: 0, checked: false})

    // const requestApiToken = "https://opentdb.com/api_token.php?command=request"
    // const useToken = "https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE"
    // const resetToken = "https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE"
    
    React.useEffect(() =>{
        if(!start){
            console.log("Fetch Categories")
            fetch("https://opentdb.com/api_category.php")
                .then(res => res.json())
                .then(data => setCategories(data.trivia_categories))
        }
        else{
            console.log("Fetch questions")
            //Gen use without token
            fetch(`https://opentdb.com/api.php?
                amount=${quizParameters.amount}&
                category=${quizParameters.category}&
                difficulty=${quizParameters.difficulty}&
                type=${quizParameters.type}&
                encode=url3986`)
                .then(res => res.json())
                .then(data => setQuestionData(data.results.map(result => {
                    const answers = []
                    answers.push(decodeURIComponent(result.correct_answer))
                    result.incorrect_answers.map(incorrect_answer => answers.push(decodeURIComponent(incorrect_answer)))
                    shuffleArray(answers)
                    
                    return{
                        question: decodeURIComponent(result.question),
                        answers: answers,
                        correct_answer: decodeURIComponent(result.correct_answer)
                    }

                })))
        }
    }, [start])


    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function handleStart(){
        setStart(true)
    }

    // function checkAnswers(){
    //     let correctSum = 0
    //     questionData.forEach((question) => {
    //         question.correct_answer === question.selection ? correctSum += 1:
    //         correctSum += 0
    //     })

    //     setQuizResults({score: correctSum, checked: true})
    //     // setEnd(prev => !prev)
    // }

    console.log(questionData)

    return (
        <div className="App">
            {!start && <StartPage
                parameters={quizParameters}
                setParameters={setQuizParameters}
                categoriesArray={categories} 
                handleStart={handleStart}/>}

            {start && <Questions 
                questions={questionData}
                count={quizResults}
                setCount={setQuizResults}
                
                />}

        </div>
    )
}
