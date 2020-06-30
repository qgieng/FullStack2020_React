import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const CreateButton= ({text,handleClick})=>{
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const PopularAnecdote = ({annecdote,points})=>{
    if(Math.max(...points)>0)
      return(
        <>
        <h1>Anecdote with most votes</h1>
          <p> {anecdotes[
                points.indexOf(
                  Math.max(...points))]} </p>
          <p> has {Math.max(...points)} votes </p>
        </>
      );
    else 
        return(<></>)
  

}
const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0,0,0,0,0,0]);
  return (
    <div>
      <h1>Anectdote of the day</h1>
      {props.anecdotes[selected]}
      <br/>
      <CreateButton text='vote'
        handleClick={
          ()=>{
            var copy = [...points];
            copy[selected]+=1;
            setPoints(copy);
          } }/>
      <CreateButton
        text='next anectdote'
        handleClick={()=>{
          setSelected(Math.floor(Math.random()*anecdotes.length));
        }}></CreateButton>
        <p>{points[selected]} votes</p>
        <PopularAnecdote annecdote={props.annecdotes}
          points = {points}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)