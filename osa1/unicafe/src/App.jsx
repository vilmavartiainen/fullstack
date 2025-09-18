import { use, useState } from 'react'

const Statistics = (props) =>{
  return (
    <table>
      <tbody>
        <StatisticLine text="good " value={props.good} />
        <StatisticLine text="neutral "value={props.neutral}/>
        <StatisticLine text="bad "value={props.bad}/>
        <StatisticLine text="all "value={props.total}/>
        <StatisticLine text="average "value={props.average}/>
        <StatisticLine text="positive "value={props.positive + "%"}/>
        </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return(
  <tr>
    <td>
    {text}
    </td>
    <td>
    {value}
    </td>
  </tr>
  )
}

const Button = ({text, onClick}) => {
  return(
    <div>
     <button onClick={onClick}>{text}</button>
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
      <Button text="good"onClick={()=>setGood(good+1)}/>
      <Button text="neutral"onClick={()=>setNeutral(neutral + 1)}/>
      <Button text="bad"onClick={()=>setBad(bad + 1)}/>
      </div>
      <h1>statistics</h1>
        <div>
        {total < 1 ? <p>No feedback given </p> : <Statistics good ={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>}
      </div>
    </div>
  )
}

export default App