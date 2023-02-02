const createServer = require('../../../../Infrastructures/http/createServer')
const container = require('../../../../Infrastructures/container')
const { expect } = require('chai')
const test = require('supertest')

describe('/exports endpoint', () => {
  let server
  before(async () => {
    server = createServer(container)
  })

  describe('POST /exports/products', () => {
    it('should return 400 when request payload not contain needed property', async () => {
      // Arrange & Action
      const response = await test(server).post('/api/exports/products')

      // Assert
      expect(response.statusCode).to.equal(400)
      expect(response.body.status).to.equal('fail')
      expect(response.body.message).to.equal('tidak dapat menambahkan antrean karena properti yang dibutuhkan tidak ada')
    })
  })

  it('should return 400 when request payload not meet data specification', async () => {
    // Arrange
    const payload = {
      targetEmail: 'faiqfananie'
    }

    // Action
    const response = await test(server).post('/api/exports/products').send(payload)

    // Assert
    expect(response.statusCode).to.equal(400)
    expect(response.body.status).to.equal('fail')
    expect(response.body.message).to.equal('tidak dapat menambahkan antrean produk karena tipe data tidak sesuai')
  })

  it('should return 201 when success', async () => {
    // Arrange
    const payload = {
      targetEmail: 'faiqfananie@email.com'
    }

    // Action
    const response = await test(server).post('/api/exports/products').send(payload)

    // Assert
    expect(response.statusCode).to.equal(201)
    expect(response.body.status).to.equal('success')
    expect(response.body.message).to.equal('Permintaan dalam antrean')
  })
})
