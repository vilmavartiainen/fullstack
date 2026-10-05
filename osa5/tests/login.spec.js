const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith, createBlog} = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'vilma',
        username: 'vilmis',
        password: 'salasana'
      }
    })

    await page.goto('http://localhost:5173')
  })

  //testataan että kirjautumislomake näkyy oletusarvoisesti
  test('Login form is shown', async ({ page }) => {

    const login = page.getByRole('heading', {name : 'login'})
    await expect(login).toBeVisible()
  })


  describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {

      await page.goto('http://localhost:5173')

      await loginWith(page, 'vilmis', 'salasana')
      await expect(page.getByText('vilma logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.goto('http://localhost:5173')

        await loginWith(page, 'vilmis', 'saalaasanaaa')
        await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {

  beforeEach(async ({ page }) => {
      await loginWith(page, 'vilmis', 'salasana')
      await expect(page.getByText('vilma logged in')).toBeVisible()
  })

  test('a new blog can be created', async ({ page }) => {
     await createBlog(page, 'testi', 'jaska', 'jaska.fi')
     await expect(page.getByText('a new blog testi by jaska added')).toBeVisible()
  })

  test('blog can be liked', async ({page}) => {
    await createBlog(page, 'testi', 'jaska', 'jaska.fi')
    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await expect(page.getByText('likes 1')).toBeVisible()
  })

  test('blog can be deleted by user who made it', async ({page}) => {
    await createBlog(page, 'testi', 'jaska', 'jaska.fi')
    await page.getByRole('button', { name: 'view' }).click()


    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'delete' }).first().click()
    
    await expect(page.getByText('testi')).toHaveCount(0)
  })

  /*test('delete button is shown to user', async ({page}) => {
    await createBlog(page, 'testi', 'jaska', 'jaska.fi')
    await page.getBy('button', { name: 'view' }).click()
  }) */

})


})