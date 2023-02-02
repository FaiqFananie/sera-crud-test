const ProductRepository = require('../../../Domains/products/ProductRepository')
const GetProductUseCase = require('../GetProductUseCase')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')

describe('GetProductUseCase', () => {
  it('should orchestrating the get product action correctly', async () => {
    // Arrange
    const expectedName = 'Macbook PRO 13'
    const expectedQty = 1
    const expectedPrice = 13000000

    const productId = 'product-123'

    const stubProductRepository = new ProductRepository()

    const stub = sinon.stub(stubProductRepository, 'getProduct').returns({
      name: 'Macbook PRO 13',
      qty: 1,
      price: 13000000,
      created_at: new Date(),
      updated_at: new Date()
    })

    const getProductUseCase = new GetProductUseCase({
      productRepository: stubProductRepository
    })

    // Action
    const result = await getProductUseCase.execute(productId)

    // Assert
    expect(stub.calledWith(productId)).to.be.equal(true)
    expect(result.name).to.equal(expectedName)
    expect(result.qty).to.equal(expectedQty)
    expect(result.price).to.equal(expectedPrice)
    expect(result.created_at instanceof Date).to.equal(true)
    expect(result.updated_at instanceof Date).to.equal(true)
  })
})
