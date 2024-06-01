import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRE_BOOKS, BOOK_ADDED } from '../queries'
import { useState } from 'react'
import { updateCache } from '../App'
import Select from 'react-select'
const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState({
    value: 'all',
    label: 'all',
  })
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      updateCache(
        client.cache,
        { query: ALL_BOOKS, variables: { genre: selectedGenre.value } },
        addedBook
      )
    },
  })

  const result =
    selectedGenre.value === 'all'
      ? useQuery(ALL_BOOKS, { skip: !props.show })
      : useQuery(
          ALL_GENRE_BOOKS,
          { variables: { genre: selectedGenre.value } },
          { skip: !props.show }
        )
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading books...</div>
  }
  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>by genre</h3>
      <Select
        defaultValue={selectedGenre}
        onChange={setSelectedGenre}
        options={props.all_genres}
      />
    </div>
  )
}

export default Books
