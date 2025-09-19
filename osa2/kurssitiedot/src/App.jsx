const Header = (props) => <h1>{props.title}</h1>

const Content = (props) => {
const { parts } = props
    return(
      <div>
        <ul>
          {parts.map(part => 
            <Part key={part.id} part={part}/>
            )}
        </ul>
      </div>
    )
  }

  const Part = ({part}) => {
    return(
    <li>{part.name} {part.exercises}</li>
    )
  }

  
const Total = ({parts}) => {
const total = parts.reduce((sum, part) => sum + part.exercises, 0)
return(
<p>Number of exercises {total}</p>
)
}


const Course = (props) =>{
  return(
      <div>
        <Header title ={props.course.name} /> 
        <Content parts={props.course.parts} />
      </div>
    )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3 
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
