const SendMessageQueueUseCase = require('../../../Applications/use_case/SendMessageQueueUseCase')

class ExportHandler {
  constructor (container) {
    this._container = container

    this.postExportProductsHandler = this.postExportProductsHandler.bind(this)
  }

  async postExportProductsHandler (req, res, next) {
    try {
      const exportProductUseCase = this._container.getInstance(SendMessageQueueUseCase.name)
      const { targetEmail } = req.body
      await exportProductUseCase.execute({ queue: 'export:products', targetEmail })

      return res.status(201).json({
        status: 'success',
        message: 'Permintaan dalam antrean'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ExportHandler
