const ProductPayload = require('../../Domains/products/entities/ProductPayload')

class EditProductUseCase {
  constructor ({ productRepository }) {
    this._productRepository = productRepository
  }

  async execute (id, payload) {
    const productPayload = new ProductPayload(payload)

    return this._productRepository.editProduct(id, productPayload)
  }
}

module.exports = EditProductUseCase
