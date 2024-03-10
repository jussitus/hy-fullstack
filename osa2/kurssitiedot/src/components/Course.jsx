const Header = ({name}) => {
    return (
      <h2>
        {name}
      </h2>
    )
  }
  
const Content = ({parts}) => {
    return (
    <>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </>
    )
}

const Part = ({part}) => {
    return (
    <p>
        {part.name} {part.exercises}
    </p>

    )
}

const Total = ({parts}) => {
    return (
    <p style={{ fontWeight : 'bold' }}>
        total of {parts.reduce((a, e) => a + e.exercises, 0)} exercises
    </p>
    )
}

const Course = ({course}) => {
    return (
    <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
    )
}

export default Course