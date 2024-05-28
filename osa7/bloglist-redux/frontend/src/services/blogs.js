import axios from 'axios'
const baseUrl = '/api/blogs'

let user

export const userToAPI = (u) => {
  user = u
}

const getTokenHeader = (user) => {
  return `Bearer ${user.token}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: getTokenHeader(user) },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updatedObject) => {
  const config = {
    headers: user ? { Authorization: getTokenHeader(user) } : null,
  }
  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject,
    config,
  )
  return response.data
}

const remove = async (removedObject) => {
  const config = {
    headers: { Authorization: getTokenHeader(user) },
  }
  const response = await axios.delete(`${baseUrl}/${removedObject.id}`, config)
  return response.data
}

const comment = async (blog, comment) => {
  const response = await axios.put(`${baseUrl}/${blog.id}/comments`, {
    blog,
    comment,
  })
  return response.data
}
export default { getAll, create, update, remove, comment }
