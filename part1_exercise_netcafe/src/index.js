import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const CreateButton = ({text,handleClick}) =>{
  
   return(
    <button 
      onClick={handleClick}>
        {text}
        </button> 
  )
}

const AdditionalStats = ({good,neutral,bad}) =>{
  var sum = good+neutral+bad;
  var sign = '';
  if(sum === 0)
    sum=1;

  const avg = (good-bad)/sum;
  var positive = good/sum;

  if(positive <1 && positive >0)
    sign='%';

  return(
  <>
    <p>average {avg}</p>
    <p>positive {positive} {sign}</p>
  </>
  )
}

const Statistic = ({text,value}) => {
  return(
    <p>{text} {value}</p>
  )


}
const Statistics = (props)=>{
  const {g_count,n_count, b_count} = props
  if(g_count === 0 && 
      n_count===0 && 
        b_count===0)
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given </p>
        </div>
        );


  return(
    <div>
      <h1>statistics</h1>
      <Statistic text="good" value ={g_count} />
      <Statistic text="neutral" value ={n_count} />
      <Statistic text="bad" value ={b_count} />
      <Statistic text='all' value={g_count+n_count+b_count}/>
      <AdditionalStats good = {g_count} bad={b_count} neutral={n_count}/>
      
    </div>
  );
}



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
    <table>
      <tr><h1>give feedback</h1></tr>
      <tr>
      <CreateButton 
        text='good' 
        handleClick={
            ()=> setGood(good+1)
          }/>
        
      <CreateButton 
              text='neutral' 
            handleClick={
        ()=> setNeutral(neutral+1)}
        />
        
          <CreateButton 
            text='bad'
            handleClick={
            ()=>setBad(bad+1)}/>
        
      </tr>
    </table>
      
    <table>
      <Statistics 
        g_count={good} 
          n_count={neutral}
           b_count={bad}/>
     
    </table>
    </div>
  )
}






ReactDOM.render(<App />, 
  document.getElementById('root')
)