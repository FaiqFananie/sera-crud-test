const DomainErrorTranslator = require('../../../Commons/exceptions/DomainErrorTranslator')
const ClientError = require('../../../Commons/exceptions/ClientError')
const Logger = require('../../../Applications/debug/Logger')

class ErrorHandler {
  constructor (container) {
    this._container = container

    this.responseError = this.responseError.bind(this)
    this.responseMethodNotAllowed = this.responseMethodNotAllowed.bind(this)
  }

  responseError (error, req, res, next) {
    const logger = this._container.getInstance(Logger.name)
    const translatedError = DomainErrorTranslator.translate(error)

    if (translatedError instanceof ClientError) {
      logger.printLog(req.originalUrl, translatedError.statusCode, req.method, req.ip, translatedError.message)
      res.status(translatedError.statusCode)
      res.json({
        status: 'fail',
        message: translatedError.message
      })
      return res
    }

    logger.printLog(req.originalUrl, 500, req.method, req.ip, error.message)
    res.status(500)
    res.json({
      status: 'fail',
      message: 'terjadi kegagalan pada server kami'
    })
    return res
  }

  responseMethodNotAllowed (req, res) {
    return res.status(405).json({
      status: 'fail',
      message: 'Method Not Allowed'
    })
  }
}

module.exports = ErrorHandler
