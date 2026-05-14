import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/robots.txt', (c) => {
  return c.text('User-agent: *\nDisallow: /')
})

export default app
