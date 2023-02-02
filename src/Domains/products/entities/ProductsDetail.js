class ProductsDetail {
  constructor (payload) {
    this._verifyPayload(payload)

    this.products = payload
  }

  _verifyPayload (payload) {
    for (const i of payload) {
      const { id, name, qty, price, createdAt, updatedAt } = i

      if (!id || !name || !qty || !price || !createdAt || !updatedAt) {
        throw new Error('PRODUCTS_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY')
      }

      if (typeof id !== 'string' || typeof name !== 'string' || typeof qty !== 'number' || typeof price !== 'number' || createdAt instanceof Date === false || updatedAt instanceof Date === false) {
        throw new Error('PRODUCTS_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION')
      }
    }
  }
}

module.exports = ProductsDetail
