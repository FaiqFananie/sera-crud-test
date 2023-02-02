const AddProductUseCase = require('../../../Applications/use_case/AddProductUseCase')
const EditProductUseCase = require('../../../Applications/use_case/EditProductUseCase')

class ProductHandler {
  constructor (container) {
    this._container = container

    this.postProductHandler = this.postProductHandler.bind(this)
    this.putProductHandler = this.putProductHandler.bind(this)
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

  async putProductHandler (req, res, next) {
    try {
      const { id } = req.params
      const editProductUseCase = this._container.getInstance(EditProductUseCase.name)
      await editProductUseCase.execute(id, req.body)

      return res.status(200).json({
        status: 'success',
        message: 'Produk berhasil diperbarui'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductHandler
