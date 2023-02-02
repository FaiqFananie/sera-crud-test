const ProductRepository = require('../../../Domains/products/ProductRepository')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const GetAllProductsUseCase = require('../GetAllProductsUseCase')
const ProductsDetail = require('../../../Domains/products/entities/ProductsDetail')

describe('GetAllProductsUseCase', () => {
  it('should orchestrating the get product action correctly', async () => {
    // Arrange
    const stubProductRepository = new ProductRepository()

    const stub = sinon.stub(stubProductRepository, 'getAllProducts').returns([{
      id: 'product-123',
      name: 'Macbook PRO 13',
      qty: 1,
      price: 13000000,
      createdAt: new Date(2023, 1, 2),
      updatedAt: new Date(2023, 1, 2)
    }])

    const getAllProductsUseCase = new GetAllProductsUseCase({
      productRepository: stubProductRepository
    })

    // Action
    const result = await getAllProductsUseCase.execute()

    // Assert
    expect(stub.calledOnce).to.be.equal(true)
    expect(result).to.be.eql(new ProductsDetail([{
      id: 'product-123',
      name: 'Macbook PRO 13',
      qty: 1,
      price: 13000000,
      createdAt: new Date(2023, 1, 2),
      updatedAt: new Date(2023, 1, 2)
    }]))
  })
})
