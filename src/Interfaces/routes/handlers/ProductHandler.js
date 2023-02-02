const AddProductUseCase = require('../../../Applications/use_case/AddProductUseCase')
const EditProductUseCase = require('../../../Applications/use_case/EditProductUseCase')
const GetAllProductsUseCase = require('../../../Applications/use_case/GetAllProductsUseCase')
const GetProductUseCase = require('../../../Applications/use_case/GetProductUseCase')

class ProductHandler {
  constructor (container) {
    this._container = container

    this.postProductHandler = this.postProductHandler.bind(this)
    this.putProductHandler = this.putProductHandler.bind(this)
    this.getProductHandler = this.getProductHandler.bind(this)
    this.getAllProductsHandler = this.getAllProductsHandler.bind(this)
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

  async getProductHandler (req, res, next) {
    try {
      const { id } = req.params
      const getProductUseCase = this._container.getInstance(GetProductUseCase.name)
      const product = await getProductUseCase.execute(id)

      return res.status(200).json({
        status: 'success',
        data: {
          product
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async getAllProductsHandler (req, res, next) {
    const getAllProductsUseCase = this._container.getInstance(GetAllProductsUseCase.name)
    const result = await getAllProductsUseCase.execute()

    return res.status(200).json({
      status: 'success',
      data: {
        products: result.products
      }
    })
  }
}

module.exports = ProductHandler
