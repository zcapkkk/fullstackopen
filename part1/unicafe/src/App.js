import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.OnClick}> {props.name} </button>
  )
}


const Feedback = () => {
  return (
    <div>
      <h2>give feedback</h2>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}



const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.all} />
            <StatisticLine text="average" value={props.average} />
            <StatisticLine text="positive" value={props.positive+'%'} />
          </tbody>
        </table>
      </div>
    )
  }
}



const App = () => {
  // save clicks of each button to each own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good+1)
    //console.log(good)
  }

  const handleBad = () => {
    setBad(bad+1)
    //console.log(bad)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
    //console.log(neutral)
  }


  return (
    <div>
      <Feedback />
      <Button name="good" OnClick={handleGood} />
      <Button name="neutral" OnClick={handleNeutral} />
      <Button name="bad" OnClick={handleBad} />
  <Statistics good={good} neutral={neutral} bad={bad} all={neutral+good+bad} average={(good-bad)/(good+bad+neutral)} positive={good/(good+bad+neutral)} />
    </div>
  )
}

export default App
