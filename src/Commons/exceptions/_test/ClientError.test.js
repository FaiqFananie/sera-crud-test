const ClientError = require('../ClientError')
const chai = require('chai')
const expect = chai.expect

describe('ClientError', () => {
  it('should throw error when directly use it', () => {
    expect(() => new ClientError('')).to.Throw('cannot instantiate abstract class')
  })
})
