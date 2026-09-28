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
    await page.goto ('http://localhost:5173/')

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
        await expect(page.getByText('wrong username or password')).toBeVisible
    })
  })

})