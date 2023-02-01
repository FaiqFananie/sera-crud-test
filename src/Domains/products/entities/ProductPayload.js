class ProductPayload {
  constructor (payload) {
    this._verifyPayload(payload)

    this.name = payload.name
    this.qty = payload.qty
    this.price = payload.price
  }

  _verifyPayload (payload) {
    const { name, qty, price } = payload

    if (!name || !qty || !price) {
      throw new Error('PRODUCT_PAYLOAD.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof name !== 'string' || typeof qty !== 'number' || typeof price !== 'number') {
      throw new Error('PRODUCT_PAYLOAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = ProductPayload
