import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recs from './components/Recs'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, ME } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [skip, setSkip] = useState(false)
  const [allGenres, setAllGenres] = useState([])
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) {
      setToken(token)
    }
  }, [])
  const tempUser = useQuery(ME, { skip: user })
  if (tempUser.data) {
    setUser(tempUser.data.me)
  }
  const result = useQuery(ALL_BOOKS, {
    skip: skip,
    onError: (error) => console.log(error),
  })
  if (result.loading) {
    return <div>Loading...</div>
  }
  if (!skip) {
    const books = result.data.allBooks
    let all_genres = new Set(books.flatMap((book) => book.genres).concat('all'))
    all_genres = [...all_genres].map((genre) => ({
      value: genre,
      label: genre,
    }))
    setAllGenres(all_genres)
    setSkip(true)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('recs')}>recs</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} all_genres={allGenres} client={client} />

      <NewBook show={page === 'add'} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
        setUser={setUser}
      />
      {user && <Recs show={page === 'recs'} user={user} />}
    </div>
  )
}

export default App
