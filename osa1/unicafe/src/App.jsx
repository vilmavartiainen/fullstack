import { use, useState } from 'react'

const Statistics = (props) =>{
  return (
    <div>
        <p>good {props.good}</p>
        <p>neutral {props.neutral} </p>
        <p>bad {props.bad}</p>
        <p>average {props.average} </p>
        <p>positive {props.positive}</p>
    </div>
  )
}

const App = () => {

  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + bad + neutral
  const average = total > 0 ?(good - bad)/ total : 0 
  const positive = total > 0 ? good/total*100 : 0

  return (
    <div>
      <h1>Give feedback</h1>
    <div>
      <button onClick={()=> setGood (good + 1)}>good</button>
      <button onClick={()=> setNeutral (neutral + 1)}>neutral</button>
      <button onClick={()=> setBad (bad + 1)}>bad</button>
      </div>
      <h1>statistics</h1>
      <Statistics good ={good} neutral={neutral} bad={bad} average={average} positive={positive}/>
    </div>
  )
}

export default App

//  <button onClick={()=> setGood (good + 1)}>good</button>