const ClientError = require('../ClientError')
const InvariantError = require('../InvariantError')
const chai = require('chai')
const expect = chai.expect

describe('InvariantError', () => {
  it('should create an error correctly', () => {
    const invariantError = new InvariantError('an error occurs')

    expect(invariantError).to.be.instanceOf(InvariantError)
    expect(invariantError).to.be.instanceOf(ClientError)
    expect(invariantError).to.be.instanceOf(Error)

    expect(invariantError.statusCode).to.equal(400)
    expect(invariantError.message).to.equal('an error occurs')
    expect(invariantError.name).to.equal('InvariantError')
  })
})
