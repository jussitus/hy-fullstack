import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let updateBlog
  beforeEach(() => {
    updateBlog = vi.fn()
    const blog = {
      title: 'TITLE',
      author: 'AUTHOR',
      url: 'URL',
      likes: 0,
    }
    render(<Blog blog={blog} updateBlog={updateBlog} />)
  })

  test('renders default view', async () => {
    screen.getByText('TITLE', { exact: false })
    expect(screen.queryByText('URL', { exact: false })).toBeNull()
    expect(screen.queryByText('likes', { exact: false })).toBeNull()
  })

  test('renders expanded view', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    screen.getByText('TITLE', { exact: false })
    screen.getByText('url: URL', { exact: false })
    screen.getByText('likes: 0', { exact: false })
  })
  test('like button calls updateBlog', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText('view'))
    await user.click(screen.getByText('like'))
    await user.click(screen.getByText('like'))
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
