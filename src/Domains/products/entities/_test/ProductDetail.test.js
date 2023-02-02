const chai = require('chai')
const ProductDetail = require('../ProductDetail')
const expect = chai.expect

describe('ProductDetail entities', () => {
  it('should throw error when detail does not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'profuct-123',
      name: 'Macbook PRO',
      qty: 10,
      price: 130000000
    }

    // Action & Assert
    expect(() => new ProductDetail(payload)).to.throw('PRODUCT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when detail not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'profuct-123',
      name: 'Macbook PRO',
      qty: 10,
      price: true,
      createdAt: new Date(2023, 1, 2),
      updatedAt: new Date(2023, 1, 2)
    }

    // Action & Assert
    expect(() => new ProductDetail(payload)).to.throw('PRODUCT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create ProductDetail entities correctly', () => {
    // Arrange
    const payload = {
      id: 'profuct-123',
      name: 'Macbook PRO',
      qty: 10,
      price: 13000000,
      createdAt: new Date(2023, 1, 2),
      updatedAt: new Date(2023, 1, 2)
    }

    // Action
    const productDetail = new ProductDetail(payload)

    // Assert
    expect(productDetail).to.be.instanceOf(ProductDetail)
    expect(productDetail.id).to.equal(payload.id)
    expect(productDetail.name).to.equal(payload.name)
    expect(productDetail.qty).to.equal(payload.qty)
    expect(productDetail.price).to.equal(payload.price)
    expect(productDetail.createdAt).to.equal(payload.createdAt)
    expect(productDetail.updatedAt).to.equal(payload.updatedAt)
  })
})
