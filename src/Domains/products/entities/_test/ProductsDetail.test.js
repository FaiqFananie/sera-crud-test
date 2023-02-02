const chai = require('chai')
const ProductsDetail = require('../ProductsDetail')
const expect = chai.expect

describe('ProductsDetail entities', () => {
  it('should throw error when details does not contain needed property', () => {
    // Arrange
    const payload = [{
      id: 'product-123',
      name: 'Macbook PRO',
      qty: 10,
      price: 130000000
    }]

    // Action & Assert
    expect(() => new ProductsDetail(payload)).to.throw('PRODUCTS_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when details does not contain needed property', () => {
    // Arrange
    const payload = [{
      id: 'product-123',
      name: 'Macbook PRO',
      qty: 10,
      price: true,
      createdAt: new Date(2023, 1, 2),
      updatedAt: new Date(2023, 1, 2)
    }]

    // Action & Assert
    expect(() => new ProductsDetail(payload)).to.throw('PRODUCTS_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create ProductsDetail entities correctly', () => {
    // Arrange
    const payload = [{
      id: 'product-123',
      name: 'Macbook PRO',
      qty: 10,
      price: 13000000,
      createdAt: new Date(2023, 1, 2),
      updatedAt: new Date(2023, 1, 2)
    }]

    // Action
    const productsDetail = new ProductsDetail(payload)

    // Assert
    expect(productsDetail).to.be.instanceOf(ProductsDetail)
    expect(productsDetail.products[0].id).to.equal(payload[0].id)
    expect(productsDetail.products[0].name).to.equal(payload[0].name)
    expect(productsDetail.products[0].qty).to.equal(payload[0].qty)
    expect(productsDetail.products[0].price).to.equal(payload[0].price)
    expect(productsDetail.products[0].createdAt).to.equal(payload[0].createdAt)
    expect(productsDetail.products[0].updatedAt).to.equal(payload[0].updatedAt)
  })
})
