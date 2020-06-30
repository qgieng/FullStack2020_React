import React from 'react'
import ReactDOM from 'react-dom'



const Header = (prop) => {
  return (
    <>
    <p> {prop.name}
    </p>
    </>
  )
}

const Content = ({part1, part2,part3}) =>{
  return (
    <>
    <Part name={part1.name} value={part1.value}/>
    <Part name={part2.name} value={part2.value}/>
    <Part name={part3.name} value={part3.value}/>
    </>

  )
}

const Part = (prop) =>{

  return (
    <>
    <p>{prop.name} {prop.value}</p>
    </>
  )


}


const Total = (props) =>{
  return (
      <>
        <p>Number of exercises {props.arg1+props.arg2+props.arg3} </p>
      </>
  )
}




const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  let part1a = {name: part1, 
                value:exercises1};
  let part2a = {name: part2, 
                value:exercises2};
  let part3a = {name: part3, 
                value:exercises3};     

  return (
    <div>
      <Header name={course}/>
      <Content part1= {part1a} part2={part2a} part3 = {part3a}></Content>
      <Total arg1={exercises1} arg2={exercises2} arg3={exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))