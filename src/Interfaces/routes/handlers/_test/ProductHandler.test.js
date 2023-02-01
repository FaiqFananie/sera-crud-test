const createServer = require('../../../../Infrastructures/http/createServer')
const container = require('../../../../Infrastructures/container')
const { expect } = require('chai')
const test = require('supertest')
const pool = require('../../../../Infrastructures/database/postgres/pool')
const ProductsTableTestHelper = require('../../../../tests/ProductsTableTestHelper')

describe('/products endpoint', () => {
  let server
  before(async () => {
    server = createServer(container)
  })

  after(async () => {
    await ProductsTableTestHelper.cleanTable()
    await pool.end()
  })
  describe('POST /products', () => {
    it('should return 400 when request payload not contain needed property', async () => {
      // Arrange
      const payload = {
        name: 'Macbook PRO 13',
        qty: 1
      }

      // Action
      const response = await test(server).post('/api/products').send(payload)

      // Assert
      expect(response.statusCode).to.equal(400)
      expect(response.body.status).to.equal('fail')
      expect(response.body.message).to.equal('tidak dapat membuat/mengubah produk karena properti yang dibutuhkan tidak ada')
    })

    it('should return 400 when request payload not meet data specification', async () => {
      // Arrange
      const payload = {
        name: 'Macbook PRO 13',
        qty: 1,
        price: []
      }

      // Action
      const response = await test(server).post('/api/products').send(payload)

      // Assert
      expect(response.statusCode).to.equal(400)
      expect(response.body.status).to.equal('fail')
      expect(response.body.message).to.equal('tidak dapat membuat/mengubah produk karena tipe data tidak sesuai')
    })

    it('should return 201 when success', async () => {
      // Arrange
      const payload = {
        name: 'Macbook PRO 13',
        qty: 1,
        price: 13000000
      }

      // Action
      const response = await test(server).post('/api/products').send(payload)

      // Assert
      expect(response.statusCode).to.equal(201)
      expect(response.body.status).to.equal('success')
      expect(response.body.data.id).to.exist
    })
  })
})
