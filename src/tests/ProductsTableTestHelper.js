/* istanbul ignore file */

const pool = require('../Infrastructures/database/postgres/pool')

const ProductsTableTestHelper = {
  async findProductById (id) {
    const query = {
      text: 'SELECT * FROM products WHERE id = $1',
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
