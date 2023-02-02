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

  afterEach(async () => {
    await ProductsTableTestHelper.cleanTable()
  })

  after(async () => {
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

  describe('PUT /products/:id', () => {
    it('should return status 404 when product is not found', async () => {
      // Arrange
      const requestPayload = {
        name: 'Macbook PRO 13',
        qty: 1,
        price: 13000000
      }

      // Action
      const response = await test(server).put('/api/products/product-123').send(requestPayload)

      // Assert
      expect(response.status).to.equal(404)
      expect(response.body.status).to.equal('fail')
      expect(response.body.message).to.equal('Produk gagal diperbarui, Id tidak ditemukan')
    })

    it('should return status 400 when request payload not contain needed property', async () => {
      // Arrange
      await ProductsTableTestHelper.addProduct({ id: 'product-123', name: 'Macbook PRO 13', price: 13000000 })
      const requestPayload = {
        name: 'Macbook PRO 14',
        qty: 1
      }

      // Action
      const response = await test(server).put('/api/products/product-123').send(requestPayload)

      // Assert
      expect(response.status).to.equal(400)
      expect(response.body.status).to.equal('fail')
      expect(response.body.message).to.equal('tidak dapat membuat/mengubah produk karena properti yang dibutuhkan tidak ada')
    })

    it('should return status 400 when request payload not meet data type specification', async () => {
      // Arrange
      await ProductsTableTestHelper.addProduct({ id: 'product-123', name: 'Macbook PRO 13', price: 13000000 })
      const requestPayload = {
        name: 'Macbook PRO 14',
        qty: [],
        price: 14000000
      }

      // Action
      const response = await test(server).put('/api/products/product-123').send(requestPayload)

      // Assert
      expect(response.status).to.equal(400)
      expect(response.body.status).to.equal('fail')
      expect(response.body.message).to.equal('tidak dapat membuat/mengubah produk karena tipe data tidak sesuai')
    })

    it('should update product when product is found', async () => {
      // Arrange
      await ProductsTableTestHelper.addProduct({ id: 'product-123', name: 'Macbook PRO 13', price: 13000000 })
      const requestPayload = {
        name: 'Macbook PRO 14',
        qty: 1,
        price: 14000000
      }

      // Action
      const response = await test(server).put('/api/products/product-123').send(requestPayload)

      // Assert
      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')
      expect(response.body.message).to.equal('Produk berhasil diperbarui')
    })
  })

  describe('GET /products/:id', () => {
    it('should return status 404 when product is not found', async () => {
      // Arrange & Action
      const response = await test(server).get('/api/products/product-123')

      // Assert
      expect(response.status).to.equal(404)
      expect(response.body.status).to.equal('fail')
      expect(response.body.message).to.equal('Id tidak ditemukan')
    })

    it('should show product when product is found', async () => {
      // Arrange
      await ProductsTableTestHelper.addProduct({ id: 'product-123', name: 'Macbook PRO 13', price: 13000000 })

      // Action
      const response = await test(server).get('/api/products/product-123')

      // Assert
      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')
      // expect(response.body.message).to.equal('Produk berhasil diperbarui')
    })
  })
})
