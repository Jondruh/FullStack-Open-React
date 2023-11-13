const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <ul>
        {course.parts.map(part => {
          return (<Content key={part.id} part={part} />);
        }
        )}
      </ul>
      <Total course={course} />
    </div>
  );
};

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  );
};

const Content = ({ part }) => {
  return <li>{part.name} {part.exercises}</li>;
};

const Total = ({ course }) => {
  const total = course.parts.reduce((a, b) => a + b.exercises, 0);

  return <p>Number of exercises: {total}</p>;
};

export default Course
