const ProductRepository = require('../../Domains/products/ProductRepository')
const NotFoundError = require('../../Commons/exceptions/NotFoundError')

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

  async editProduct (id, payload) {
    const { name, qty, price } = payload
    const updatedAt = new Date()

    const query = {
      text: 'UPDATE products SET name = $2, qty = $3, price = $4, updated_at = $5 WHERE id = $1',
      values: [id, name, qty, price, updatedAt]
    }

    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new NotFoundError('Produk gagal diperbarui, Id tidak ditemukan')
    }
  }
}

module.exports = ProductRepositoryPostgres
