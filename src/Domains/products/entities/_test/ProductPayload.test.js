const chai = require('chai')
const expect = chai.expect
const ProductPayload = require('../ProductPayload')

describe('ProductPayload entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      name: 'Macbook PRO',
      qty: 10
    }

    // Action & Assert
    expect(() => new ProductPayload(payload)).to.throw('PRODUCT_PAYLOAD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      name: 'Macbook PRO',
      qty: 10,
      price: true
    }

    // Action & Assert
    expect(() => new ProductPayload(payload)).to.throw('PRODUCT_PAYLOAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create ProductPayload entities correctly', () => {
    // Arrange
    const payload = {
      name: 'Macbook PRO',
      qty: 10,
      price: 13000000
    }

    // Action
    const productPayload = new ProductPayload(payload)

    // Assert
    expect(productPayload).to.be.instanceOf(ProductPayload)
    expect(productPayload.name).to.equal(payload.name)
    expect(productPayload.qty).to.equal(payload.qty)
    expect(productPayload.price).to.equal(payload.price)
  })
})
