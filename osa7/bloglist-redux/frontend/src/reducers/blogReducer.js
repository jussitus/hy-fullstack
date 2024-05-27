import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

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
  },
})

const { addBlog, updateBlog, setBlogs, deleteBlog } = blogSlice.actions

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

export default blogSlice.reducer

// const removeBlog = async (blogObject) => {
//   await blogService.remove(blogObject)
//   const removedBlogs = [...blogs].filter((x) => x.id !== blogObject.id)
//   setBlogs(removedBlogs)
// }
