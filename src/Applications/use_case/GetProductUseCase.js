
class GetProductUseCase {
  constructor ({ productRepository }) {
    this._productRepository = productRepository
  }

  async execute (id) {
    return this._productRepository.getProduct(id)
  }
}

module.exports = GetProductUseCase
