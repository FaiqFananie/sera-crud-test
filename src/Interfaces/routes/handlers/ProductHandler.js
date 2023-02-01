const AddProductUseCase = require('../../../Applications/use_case/AddProductUseCase')

class ProductHandler {
  constructor (container) {
    this._container = container

    this.postProductHandler = this.postProductHandler.bind(this)
  }

  async postProductHandler (req, res, next) {
    try {
      const addProductUseCase = this._container.getInstance(AddProductUseCase.name)
      const idProduct = await addProductUseCase.execute(req.body)

      return res.status(201).json({
        status: 'success',
        data: {
          id: idProduct
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductHandler
