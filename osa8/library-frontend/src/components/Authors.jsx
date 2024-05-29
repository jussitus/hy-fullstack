import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, { skip: !props.show })
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const [year, setYear] = useState(0)
  const [selectedAuthor, setSelectedAuthor] = useState('')
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>Loading authors...</div>
  }
  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: {
        name: selectedAuthor.value,
        setBornTo: Number(year),
      },
    })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedAuthor}
          onChange={setSelectedAuthor}
          options={authors.map((author) => ({
            value: author.name,
            label: author.name,
          }))}
        />
        <button type="submit">update author</button>
        born
        <input
          type="number"
          value={year}
          onChange={({ target }) => setYear(target.value)}
        ></input>
      </form>
    </div>
  )
}

export default Authors
