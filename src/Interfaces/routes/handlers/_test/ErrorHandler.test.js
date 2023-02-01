const ErrorHandler = require('../ErrorHandler')
const NotFoundError = require('../../../../Commons/exceptions/NotFoundError')
const { expect } = require('chai')
const sinon = require('sinon')
const test = require('supertest')
const createServer = require('../../../../Infrastructures/http/createServer')

describe('ErrorHandler', () => {
  describe('responseError', () => {
    it('should return 404 when it is Not Found Error', () => {
      // Arrange
      const errorHandler = new ErrorHandler()
      const error = new NotFoundError('Product gagal diperbarui, Id tidak ditemukan')
      const req = {}
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      }

      // Action
      errorHandler.responseError(error, req, res)

      // Assert
      expect(res.status.calledWith(404)).to.equal(true)
      expect(res.json.calledWith({
        status: 'fail',
        message: 'Product gagal diperbarui, Id tidak ditemukan'
      })).to.equal(true)
    })

    it('should return 400 when it is InvariantError', () => {
      // Arrange
      const errorHandler = new ErrorHandler()
      const error = new Error('PRODUCT_PAYLOAD.NOT_CONTAIN_NEEDED_PROPERTY')
      const req = {}
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      }

      // Action
      errorHandler.responseError(error, req, res)

      // Assert
      expect(res.status.calledWith(400)).to.equal(true)
      expect(res.json.calledWith({
        status: 'fail',
        message: 'tidak dapat membuat/mengubah produk karena properti yang dibutuhkan tidak ada'
      })).to.equal(true)
    })

    it('should return 500 when it is unexplained error', () => {
      // Arrange
      const errorHandler = new ErrorHandler()
      const error = new Error('UNEXPLAINED_ERROR')
      const req = {}
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      }

      // Action
      errorHandler.responseError(error, req, res)

      // Assert
      expect(res.status.calledWith(500)).to.equal(true)
      expect(res.json.calledWith({
        status: 'fail',
        message: 'terjadi kegagalan pada server kami'
      })).to.equal(true)
    })
  })

  describe('responseError', () => {
    it('should return 405 when method is undefined', async () => {
      // Arrange
      const server = createServer({})

      // Action
      const response = await test(server).get('/api/products')

      // Assert
      expect(response.statusCode).to.equal(405)
      expect(response.body.status).to.equal('fail')
      expect(response.body.message).to.equal('Method Not Allowed')
    })
  })
})
