const createServer = require('../createServer')
const test = require('supertest')
const { expect } = require('chai')

describe('createServer', () => {
  it('should return 200', async () => {
    // Arrange
    const server = createServer({})

    // Action
    const response = await test(server).get('/')

    // Assert
    expect(response.statusCode).to.equal(200)
  })
})
