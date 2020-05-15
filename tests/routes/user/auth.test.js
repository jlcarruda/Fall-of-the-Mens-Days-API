const request = require('supertest')
const server = require('../../../src/server')

describe('POST /user/auth', () => {
  it('should not authenticate if credentials are not found', async () => {
    const app = await server({
      PORT: 3000,
      ORM: {
        connect: () => {}
      }
    })

    console.log('APP', app)

    const res = await request(app)
      .post('/user/auth')
      .send({
        username: 'teste',
        password: 'teste'
      })
    console.log(res)
    expect(res.body).toBeTruthy()
  })
})
