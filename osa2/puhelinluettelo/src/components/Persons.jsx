const Person = ({ person }) => {
  return (
    <>{person.name} {person.number}</>
  )
}


export const Persons = ({ persons, searchword, deletePerson }) => {
  return (
    <>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(searchword.toLowerCase())).map(person => <li key={person.id}>
          <Person person={person} /> <button type="submit" value={person.id} onClick={deletePerson}>delete</button>
        </li>)}
      </ul>
    </>
  )
}

