const ProductRepository = require('../ProductRepository')
const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('ProductRepository', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const productRepository = new ProductRepository()

    // Assert
    await expect(productRepository.addProduct()).to.be.rejectedWith(Error, 'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(productRepository.editProduct('')).to.be.rejectedWith(Error, 'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(productRepository.getProduct('')).to.be.rejectedWith(Error, 'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(productRepository.getAllProducts('')).to.be.rejectedWith(Error, 'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(productRepository.deleteProduct('')).to.be.rejectedWith(Error, 'PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  })
})
