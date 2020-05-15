const request = require('supertest')
const { encrypt } = require('../../../src/utils')
const server = require('../../../src/server')

describe('POST /user/auth', () => {
  it('should authenticate if credentials are found', async () => {
    const app = await server({
      PORT: 3000,
      MODELS: {
        User: {
          findOne: () => Promise.resolve({
            username: 'teste',
            password: encrypt('teste'),
            _id: '1'
          })
        }
      },
      ORM: {
        connect: () => {}
      }

    })

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
