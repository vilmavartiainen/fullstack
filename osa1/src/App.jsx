
const Header = (props) => {
  console.log(props)
  return(
    <div>
      <p>{props.course}
      </p>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part osa={props.part1} />
      <Part osa={props.part2}/>
      <Part osa={props.part3}/>
  </div>
  )
} 

const Part = (props) => {
  return(
    <div>
    <p> {props.osa} </p>
    </div>
  )
}
/*
const Total = (props) => {
  console.log(props)
  return(
    <div>
      <p>Total of exercises is : {props.exercises1 +props.exercises2 + props.exercises3 }</p>
    </div>
  )
}*/

  const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }

  return (
    <div>
      <Header course={course} />
      <Content part1={"In part: "+ part1.name + "cnumber of exercises is " + part1.exercises} 
      part2={"In part: " + part2.name + " number of exercises is " + part2.exercises} 
      part3={"In part: " + part3.name + " number of exercises is " + part3.exercises} 
      />
    </div>
  )
}

export default App

      /*
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} 
      /> */