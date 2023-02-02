/* istanbul ignore file */

const pool = require('../Infrastructures/database/postgres/pool')

const ProductsTableTestHelper = {
  async addProduct ({
    id = 'product-123', name = 'Macbook PRO 13', qty = 1, price = 13000000, createdAt = new Date(), updatedAt = new Date(), isdelete = false
  }) {
    const query = {
      text: 'INSERT INTO products VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, name, qty, price, createdAt, updatedAt, isdelete]
    }

    const result = await pool.query(query)

    return result.rows[0].id
  },

  async findProductById (id) {
    const query = {
      text: 'SELECT * FROM products WHERE id = $1 AND is_delete = false',
      values: [id]
    }

    const result = await pool.query(query)
    return result.rows
  },

  async cleanTable () {
    await pool.query('DELETE FROM products WHERE 1=1')
  }
}

module.exports = ProductsTableTestHelper
