class ProductDetail {
  constructor (payload) {
    this._verifyPayload(payload)

    this.id = payload.id
    this.name = payload.name
    this.qty = payload.qty
    this.price = payload.price
    this.createdAt = payload.createdAt
    this.updatedAt = payload.updatedAt
  }

  _verifyPayload (payload) {
    const { id, name, qty, price, createdAt, updatedAt } = payload

    if (!id || !name || !qty || !price || !createdAt || !updatedAt) {
      throw new Error('PRODUCT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof id !== 'string' || typeof name !== 'string' || typeof qty !== 'number' || typeof price !== 'number' || createdAt instanceof Date === false || updatedAt instanceof Date === false) {
      throw new Error('PRODUCT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = ProductDetail
