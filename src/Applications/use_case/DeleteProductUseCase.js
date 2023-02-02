class DeleteProductUseCase {
  constructor ({ productRepository }) {
    this._productRepository = productRepository
  }

  async execute (id) {
    return this._productRepository.deleteProduct(id)
  }
}

module.exports = DeleteProductUseCase
