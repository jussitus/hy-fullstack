import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { addBlogToUser } from './userListReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog,
      )
    },
    setBlogs(state, action) {
      return action.payload
    },
    addComment(state, action) {
      state
        .find((blog) => blog.id === action.payload.blog.id)
        .comments.push(action.payload.comment)
    },
  },
})

const { addBlog, updateBlog, setBlogs, deleteBlog, addComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const result = await blogService.create(blog)
      dispatch(addBlog(result))
      dispatch(addBlogToUser(result))
      dispatch(
        setNotification({
          message: `New blog added: ${result.title} by ${result.author}`,
          error: false,
        }),
      )
    } catch (exception) {
      console.log(exception.message, exception.name)
      dispatch(
        setNotification({
          message: 'Title, author or url missing',
          error: true,
        }),
      )
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    const removedBlog = await blogService.remove(blog)
    dispatch(deleteBlog(removedBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const result = await blogService.update(updatedBlog)
    dispatch(updateBlog(result))
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    await blogService.comment(blog, comment)
    dispatch(addComment({ blog, comment }))
  }
}

export default blogSlice.reducer
