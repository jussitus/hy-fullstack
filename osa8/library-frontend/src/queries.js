import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    author {
      name
      born
      bookCount
    }
    title
    published
    genres
    id
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author {
        name
        born
        bookCount
      }
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_GENRE_BOOKS = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook(
    $author: String!
    $title: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      author: $author
      title: $title
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
        bookCount
      }
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query me {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
