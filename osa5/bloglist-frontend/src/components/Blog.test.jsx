import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders title', () => {
    const blog = {
        title: 'Testaus title',
        author: 'vilma',
        url: 'jeejee.fi',
        likes: '50',
        user: {
            name: 'vilmis',
            username: 'vilmis222'
        }

    }
    
    const kirjautunutKayttaja = {
        name: 'vilmis',
        username: 'vilmis222'
    }


    render(<Blog blog={blog} user={kirjautunutKayttaja}/>)

    //Ei testata blogin authorin renderöintiä, koska tehtävä 5.7 tehty

    //Testataan että title näkyy käyttäjälle
    const element = screen.getAllByText('Testaus title' , { exact: false}) 
    expect(element[0]).toBeDefined()
    
    // tarkistus ettei url näy käyttäjälle
    const element2 = screen.getByText('jeejee.fi', {exact: false})
    expect(element2).not.toBeVisible()

    //tarkistus ettei liket näy käyttäjälle
    const element3 = screen.getByText('50', { exact: false})
    expect(element3).not.toBeVisible()

})

//Testataan että url ja liket näkyy kun view on painettu
test('clicking view button shows url and likes', async () => {
    const blog = {
        title: 'Testaus title',
        author: 'vilma',
        url: 'jeejee.fi',
        likes: '50',
        user: {
            name: 'vilmis',
            username: 'vilmis222'
        }

    }
    
    const kirjautunutKayttaja = {
        name: 'vilmis',
        username: 'vilmis222'
    }

    render(<Blog blog={blog} user={kirjautunutKayttaja}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlElement = screen.getByText('jeejee.fi', {exact: false})
    expect(urlElement).toBeVisible

    const likesElement = screen.getByText('50', { exact: false})
    expect(likesElement).toBeVisible()
})

test('kun likeä painetaan kahdesti, komponenti  propsina saamaa tapahtumankäsittelijäfunktiota kutsutaan kaksi kertaa', async () => {

    const blog = {
        title: 'Testaus title',
        author: 'vilma',
        url: 'jeejee.fi',
        likes: '50',
        user: {
            name: 'vilmis',
            username: 'vilmis222'
        }

    }
    
    const kirjautunutKayttaja = {
        name: 'vilmis',
        username: 'vilmis222'
    }

    const handleLikes = vi.fn()

    render(<Blog blog={blog} user={kirjautunutKayttaja} handleLikes={handleLikes}/>)

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(handleLikes.mock.calls).toHaveLength(2)


})