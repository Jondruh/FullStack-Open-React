export const Persons = ({ persons, deleteName }) => {
  return (
    <div>
      {persons.map(person => {
        return (
          <p key={person.id}>{person.name} {person.number}
          <button onClick={() => deleteName(person.id)} type="button">delete</button>
          </p> 
        )
      })}
    </div>
  );
};
