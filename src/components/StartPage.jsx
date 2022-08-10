import React from "react"

export default function StartPage({parameters, setParameters, categoriesArray, handleStart}){

    function handleChange(event){
        const {name, value } = event.target //destructuring of the event.target
        setParameters(prevParameters =>{
            return {
                ...prevParameters,
                [name]: value
            }
        })
    }
    //Creating a list of options from props.categoriesArray
    const selectOptions = categoriesArray.map(el => <option key={el.id} value={el.id}>{el.name}</option>)
    selectOptions.unshift(<option key="8" value="">--Choose a category--</option>)
    
    return(
        <div className="start-page">
            <h1>Quizzical</h1>
            <form>
                <select
                    className="category"
                    name="category"//To identify form element
                    value={parameters.category}//Also makes the form element controlled by React
                    id="category"
                    onChange={handleChange}>
                    {selectOptions}
                </select>

                <div className="difficulty">
                    <legend>Difficulty</legend>
                    <input 
                        type="radio"
                        id="easy" // to assosiate with a label element
                        name="difficulty"
                        value="easy"
                        checked={parameters.difficulty === "easy"} //Makes the form element controlled by React
                        onChange={handleChange}
                    />
                    <label htmlFor="easy">Easy</label>
                    
                    <input 
                        type="radio"
                        id="medium"
                        name="difficulty"
                        value="medium"
                        checked={parameters.difficulty === "medium"}
                        onChange={handleChange}
                    />
                    <label htmlFor="medium">Medium</label>
                    
                    <input 
                        type="radio"
                        id="hard"
                        name="difficulty"
                        value="hard"
                        checked={parameters.difficulty === "hard"}
                        onChange={handleChange}
                    />
                    <label htmlFor="hard">Hard</label>
                    
                </div>

                <div className="type">
                    <legend>Type</legend>
                    <input 
                        name="type"
                        value="multiple"
                        type="radio"
                        id="multchoice"
                        checked={parameters.type === "multiple"}
                        onChange={handleChange}
                    />
                    <label htmlFor="multchoice">Multiple choice</label>
                    
                    <input 
                        name="type"
                        value="boolean"
                        type="radio"
                        id="bool"
                        checked={parameters.type === "boolean"}
                        onChange={handleChange}
                    />
                    <label htmlFor="bool">True / False</label>
                </div>
            </form>
            <button onClick={handleStart}>Start quiz</button>
        </div>
    )
}