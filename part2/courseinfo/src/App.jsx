function Header({ course }) {
  return <h1>{course}</h1>
}

function Part({ part }) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}


function Content({ parts }) {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </>

  )
}

function Total({ parts }) {
  let sum = 0

  for (let i = 0; i < parts.length; i++) sum += parts[i].exercises

  return <p><b>Total of {sum} exercises</b></p>
}

function Course({ course }) {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

function App() {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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

  return <Course course={course} />
}

export default App