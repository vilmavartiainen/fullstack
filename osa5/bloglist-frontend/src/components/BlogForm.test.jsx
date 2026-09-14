import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> ', async () => {

    const user = userEvent.setup()
    const createBlog = vi.fn()


    render(<BlogForm createBlog={createBlog}/>)

    const titleinput = screen.getByPlaceholderText('title')
    const authorinput = screen.getByPlaceholderText('author')
    const urlinput = screen.getByPlaceholderText('url')

    const sendButton = screen.getByText('create')

    await user.type(titleinput, 'otsikko')
    await user.type(authorinput, 'kirjoittaja')
    await user.type(urlinput, 'url osoite')

    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('otsikko')
    expect(createBlog.mock.calls[0][0].author).toBe('kirjoittaja')
    expect(createBlog.mock.calls[0][0].url).toBe('url osoite')
})