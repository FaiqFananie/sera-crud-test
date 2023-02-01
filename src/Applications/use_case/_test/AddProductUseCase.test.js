const ProductRepository = require('../../../Domains/products/ProductRepository')
const AddProductUseCase = require('../AddProductUseCase')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const ProductPayload = require('../../../Domains/products/entities/ProductPayload')

describe('AddProductUseCase', () => {
  it('should orchestrating the add product action correctly', async () => {
    // Arrange
    const useCasePayload = {
      name: 'Macbook PRO 13',
      qty: 1,
      price: 13000000
    }

    const expectedId = 'product-123'

    const stubProductRepository = new ProductRepository()

    const stub = sinon.stub(stubProductRepository, 'addProduct').returns('product-123')

    const addProductUseCase = new AddProductUseCase({
      productRepository: stubProductRepository
    })

    // Action
    const productId = await addProductUseCase.execute(useCasePayload)

    // Assert
    expect(productId).to.equal(expectedId)
    expect(stub.calledWith(new ProductPayload({
      name: useCasePayload.name,
      qty: useCasePayload.qty,
      price: useCasePayload.price
    }))).to.be.equal(true)
  })
})
