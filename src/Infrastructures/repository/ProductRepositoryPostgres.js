const ProductRepository = require('../../Domains/products/ProductRepository')

class ProductRepositoryPostgres extends ProductRepository {
  constructor (pool, idGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addProduct (payload) {
    const { name, qty, price } = payload
    const id = `product-${this._idGenerator()}`
    const date = new Date()

    const query = {
      text: 'INSERT INTO products VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, name, qty, price, date, date, false]
    }

    const result = await this._pool.query(query)

    return result.rows[0].id
  }
}

module.exports = ProductRepositoryPostgres
