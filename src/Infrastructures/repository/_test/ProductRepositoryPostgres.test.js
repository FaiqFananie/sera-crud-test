const ProductPayload = require('../../../Domains/products/entities/ProductPayload')
const ProductsTableTestHelper = require('../../../tests/ProductsTableTestHelper')
// const pool = require('../../database/postgres/pool')
const ProductRepositoryPostgres = require('../ProductRepositoryPostgres')
const chai = require('chai')
const pool = require('../../database/postgres/pool')
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')
chai.use(chaiAsPromised)

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

  describe('editProduct Function', () => {
    it('should throw error with statuscode 404 when product is not found', async () => {
      // Arrange
      const payload = new ProductPayload({
        name: 'Macbook PRO 14',
        qty: 1,
        price: 14000000
      })
      const productRepositoryPostgres = new ProductRepositoryPostgres(pool, {})

      // Action and Assert
      return expect(productRepositoryPostgres.editProduct('product-123', payload))
        .to.be.rejectedWith(NotFoundError, 'Produk gagal diperbarui, Id tidak ditemukan')
    })

    it('should persist product update payload correctly', async () => {
      // Arrange
      const productId = await ProductsTableTestHelper.addProduct({ id: 'product-123', name: 'Macbook PRO 13', price: 14000000 })
      const payload = new ProductPayload({
        name: 'Macbook PRO 14',
        qty: 1,
        price: 14000000
      })

      const productRepositoryPostgres = new ProductRepositoryPostgres(pool, {})

      // Action
      await productRepositoryPostgres.editProduct(productId, payload)

      // Assert
      const product = await ProductsTableTestHelper.findProductById(productId)
      expect(product).to.have.length(1)
      expect(product[0].name).to.equal(payload.name)
      expect(product[0].price).to.equal(payload.price)
    })
  })
})
