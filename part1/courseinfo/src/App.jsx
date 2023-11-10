const App = () => {
  const course = 'Half Stack application development'
  const content = [
    {key: 1, part: 'Fundamentals of React', exercises: 10},
    {key: 2, part: 'Using props to pass data', exercises: 7},
    {key: 3, part: 'State of a component', exercises: 14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={content} />
      <Total parts={content} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  let toRender = [];
  console.log(props)
  props.parts.forEach(part => {
    toRender.push(<li key={part.key}>{part.part} {part.exercises}</li>);
  });

  return toRender;

}

const Total = (props) => {
  const total = props.parts
    .map(part => part.exercises)
    .reduce((a, b) => a + b);

  return <p>Number of exercises: {total}</p>
}

export default App