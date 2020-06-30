import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  const [ counter, setCounter ] = useState(0);

    const increaseByOne = ()=>{
      setCounter(counter+1);
    }
    const decreaseByOne= ()=>{
      setCounter(counter-1);
    }

    const setToZero  = () => setCounter(0);

  return (
    <div>

      <Display counter = {counter}></Display>
      <Button 
        handleClick= {increaseByOne}
        text= 'plus'/>
      <Button 
          handleClick={decreaseByOne}
          text='minus' />
      <Button 
          handleClick={setToZero}
          text='reset' />
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)