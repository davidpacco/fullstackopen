function Header({ course }) {
  return <h2>{course}</h2>
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
  const sum = parts.reduce((acc, { exercises }) => acc + exercises, 0)

  return <p><b>Total of {sum} exercises</b></p>
}

export function Course({ course }) {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}