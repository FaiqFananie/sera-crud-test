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

  async getProduct (productId) {
    const query = {
      text: 'SELECT id, name, qty, price, created_at AS createdat, updated_at AS updatedat FROM products WHERE id = $1 AND is_delete = false ORDER BY updated_at',
      values: [productId]
    }

    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new NotFoundError('Id tidak ditemukan')
    }

    const { id, name, qty, price, createdat: createdAt, updatedat: updatedAt } = result.rows[0]
    return { id, name, qty, price, createdAt, updatedAt }
  }

  async getAllProducts () {
    const query = 'SELECT id, name, qty, price, created_at AS createdat, updated_at AS updatedat FROM products WHERE is_delete = false ORDER BY updated_at'

    const result = await this._pool.query(query)

    return result.rows.map(v => ({
      id: v.id,
      name: v.name,
      qty: v.qty,
      price: v.price,
      createdAt: v.createdat,
      updatedAt: v.updatedat
    }))
  }

  async deleteProduct (id) {
    const query = {
      text: 'UPDATE products SET is_delete = true WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new NotFoundError('Produk gagal dihapus, Id tidak ditemukan')
    }
  }
}

module.exports = ProductRepositoryPostgres
