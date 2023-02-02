const ProductRepository = require('../../../Domains/products/ProductRepository')
const EditProductUseCase = require('../EditProductUseCase')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const ProductPayload = require('../../../Domains/products/entities/ProductPayload')

describe('EditProductUseCase', () => {
  it('should orchestrating the edit product action correctly', async () => {
    // Arrange
    const useCasePayload = {
      name: 'Macbook PRO 13',
      qty: 1,
      price: 13000000
    }

    const productId = 'product-123'

    const stubProductRepository = new ProductRepository()

    const stub = sinon.stub(stubProductRepository, 'editProduct').returns()

    const editProductUseCase = new EditProductUseCase({
      productRepository: stubProductRepository
    })

    // Action
    await editProductUseCase.execute(productId, useCasePayload)

    // Assert
    expect(stub.calledWith(productId, new ProductPayload({
      name: useCasePayload.name,
      qty: useCasePayload.qty,
      price: useCasePayload.price
    }))).to.be.equal(true)
  })
})
