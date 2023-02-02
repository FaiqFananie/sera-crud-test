const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const ProductRepository = require('../../../Domains/products/ProductRepository')
const DeleteProductUseCase = require('../DeleteProductUseCase')

describe('DeleteProductUseCase', () => {
  it('should orchestrating the delete product action correctly', async () => {
    // Arrange
    const productId = 'product-123'

    const stubProductRepository = new ProductRepository()

    const stub = sinon.stub(stubProductRepository, 'deleteProduct').returns()

    const deleteProductUseCase = new DeleteProductUseCase({
      productRepository: stubProductRepository
    })

    // Action
    await deleteProductUseCase.execute(productId)

    // Assert
    expect(stub.calledWith(productId)).to.be.equal(true)
  })
})
