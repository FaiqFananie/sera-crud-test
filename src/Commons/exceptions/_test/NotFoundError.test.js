const NotFoundError = require('../NotFoundError')
const ClientError = require('../ClientError')
const chai = require('chai')
const expect = chai.expect

describe('NotFoundError', () => {
  it('should create error correctly', () => {
    const notFoundError = new NotFoundError('not found!')

    expect(notFoundError).to.be.instanceOf(NotFoundError)
    expect(notFoundError).to.be.instanceOf(ClientError)
    expect(notFoundError).to.be.instanceOf(Error)

    expect(notFoundError.message).to.equal('not found!')
    expect(notFoundError.statusCode).to.equal(404)
    expect(notFoundError.name).to.equal('NotFoundError')
  })
})
