const ProductsDetail = require('../../Domains/products/entities/ProductsDetail')

class GetAllProductsUseCase {
  constructor ({ productRepository }) {
    this._productRepository = productRepository
  }

  async execute () {
    const result = await this._productRepository.getAllProducts()
    return new ProductsDetail(result)
  }
}

module.exports = GetAllProductsUseCase
