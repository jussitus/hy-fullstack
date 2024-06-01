import { useQuery } from '@apollo/client'
import { ALL_GENRE_BOOKS, ME } from '../queries'
const Recs = (props) => {
  const result = useQuery(
    ALL_GENRE_BOOKS,
    {
      variables: { genre: props.user.favoriteGenre },
    },
    {
      fetchPolicy: 'network-only',
    },
    { skip: !props.show }
  )
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }
  const books = result.data.allBooks
  return (
    <div>
      <h2>Recommendations</h2>
      in your favorite genre <b>{props.user.favoriteGenre}</b>
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
    </div>
  )
}

export default Recs
