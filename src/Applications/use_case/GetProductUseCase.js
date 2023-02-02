const ProductDetail = require('../../Domains/products/entities/ProductDetail')

class GetProductUseCase {
  constructor ({ productRepository }) {
    this._productRepository = productRepository
  }

  async execute (productId) {
    const product = await this._productRepository.getProduct(productId)
    return new ProductDetail(product)
  }
}

module.exports = GetProductUseCase
