const ProductPayload = require('../../../Domains/products/entities/ProductPayload')
const ProductsTableTestHelper = require('../../../tests/ProductsTableTestHelper')
// const pool = require('../../database/postgres/pool')
const ProductRepositoryPostgres = require('../ProductRepositoryPostgres')
const chai = require('chai')
const pool = require('../../database/postgres/pool')
const expect = chai.expect

describe('ProductRepositoryPostgres', () => {
  afterEach(async () => {
    await ProductsTableTestHelper.cleanTable()
  })

  describe('addProduct', () => {
    it('should persist register user and return registered user correctly', async () => {
      // Arrange
      const payload = new ProductPayload({
        name: 'Macbook PRO 13',
        qty: 1,
        price: 130000000
      })
      const fakeIdGenerator = () => '123' // stub!
      const productRepositoryPostgres = new ProductRepositoryPostgres(pool, fakeIdGenerator)

      // Action
      await productRepositoryPostgres.addProduct(payload)

      // Assert
      const product = await ProductsTableTestHelper.findProductById('product-123')
      expect(product).to.have.length(1)
    })
  })
})
