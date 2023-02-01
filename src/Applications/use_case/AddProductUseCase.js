const ProductPayload = require('../../Domains/products/entities/ProductPayload')

class AddProductUseCase {
  constructor ({ productRepository }) {
    this._productRepository = productRepository
  }

  async execute (payload) {
    const productPayload = new ProductPayload(payload)

    const idProduct = await this._productRepository.addProduct(productPayload)

    return idProduct
  }
}

module.exports = AddProductUseCase
