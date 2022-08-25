import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.click}>{props.text}</button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const NextAnecdote = () => {
    let another_number = selected;
    do {
    another_number = Math.floor(Math.random()*anecdotes.length);
    } while (another_number === selected);
    return (
     setSelected(another_number)
    )
  }

  const Voting = (index) => {
    const newPoints = [...points]
    newPoints[index] += 1
    setPoints(newPoints)
    console.log(points)
    console.log(Math.max(points))
  }

  const maxpoints = Math.max.apply(null, points)
  const maxpoints_index = points.indexOf(maxpoints)


  return (
    <div>
      <h1>Anecdote of the day </h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes </p>
      <Button click={()=>Voting(selected)} text="vote" />
      <Button click={NextAnecdote} text="next anecdote" />
      <h1>Anecdote with the most votes </h1>
      {anecdotes[maxpoints_index]}
      <p>has {maxpoints} votes </p>
    </div>
  )
}

export default App
