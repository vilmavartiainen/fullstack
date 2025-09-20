const Course = ({course}) =>{
    return(
        <div>
          <Header title ={course.name} /> 
          <Content parts={course.parts} />
          <Total parts={course.parts}/>
        </div>
      )
  }

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
export default Course