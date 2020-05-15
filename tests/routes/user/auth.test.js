const request = require('supertest')
const config = require('../../../src/config')
const server = require('../../../src/server')

const serverConfig = {
  ...config,
  MODELS: {
    User: {
      findOne: () => Promise.resolve({
        username: 'teste',
        password: 'teste',
        _id: '1',
        verifyPassword: password => {
          return password === this.password
        }
      })
    }
  },
  ORM: {
    connect: () => {}
  }
}

describe('POST /user/auth', () => {
  it('should authenticate if credentials are found', async () => {
    const app = await server(serverConfig)

    const res = await request(app)
      .post('/user/auth')
      .send({
        username: 'teste',
        password: 'teste'
      })
    expect(res.status).toBe(200)
    expect(Object.keys(res.body).sort()).toStrictEqual(['data', 'status'].sort())
  })
})
