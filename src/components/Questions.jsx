import React from 'react'

export default function Quiz({questions, setStart}){
    const[quizAnswers, setQuizAnswers] = React.useState({})
    const [score, setScore] = React.useState(0)
    const[completed, setCompleted] = React.useState(false)
    
    function handleChange(event){
        const {name, value } = event.target //destructuring of the event.target
        setQuizAnswers(prevState =>{
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    function checkAnswers(event){
        event.preventDefault()
        let sum = 0
        questions.forEach((question) => {
            question.correct_answer === quizAnswers[question.question] ? sum++ : sum += 0
        })
        setScore(sum)
        setCompleted(true)
    }
    
    const quiz = questions.map(({question, answers, correct_answer}, index) => {
        return(
            <div key={index} className="question-element" >
                <legend className="question">{question}</legend>
                <div className="answers">
                    {answers.map((answer, subindex) => {
                        return(
                            <div className="answer-wrapper" key={`${index}.${subindex}`}>
                                <input
                                    className="radio"
                                    name={question}
                                    value={answer}
                                    type="radio"
                                    id={`${index}.${subindex}`}
                                    checked={quizAnswers[question] === answer}
                                    onChange={handleChange}
                                    disabled={completed}
                                />
                                <label 
                                    htmlFor={`${index}.${subindex}`} 
                                    className={`answer ${completed ? (answer === correct_answer ? "correct" : (answer === quizAnswers[question] ? "wrong" : "")) : (quizAnswers[question] === answer ? "selected": "")}`}>
                                    {answer}
                                </label>
                            </div>)
                    })}
                </div>
            </div>)
    })
    
    console.log(quizAnswers)
    return(
        <div className="quiz">
            <form onSubmit={completed ? (e) => {
                e.preventDefault
                setStart(prev => !prev)} : checkAnswers}>
                {quiz}
                <div className="score">
                    {completed && <p>You scored correct {score}/5 answers</p>}
                    <button
                        className="check-btn"
                        disabled={Object.keys(quizAnswers).length != 5}>
                        {completed ? "Play again" : "Check answers"}
                    </button>
                </div>
            </form>
        </div>)
}