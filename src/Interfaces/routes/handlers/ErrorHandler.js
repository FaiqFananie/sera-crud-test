const DomainErrorTranslator = require('../../../Commons/exceptions/DomainErrorTranslator')
const ClientError = require('../../../Commons/exceptions/ClientError')

class ErrorHandler {
  constructor () {
    this.responseError = this.responseError.bind(this)
    this.responseMethodNotAllowed = this.responseMethodNotAllowed.bind(this)
  }

  responseError (error, req, res, next) {
    const translatedError = DomainErrorTranslator.translate(error)

    if (translatedError instanceof ClientError) {
      res.status(translatedError.statusCode)
      res.json({
        status: 'fail',
        message: translatedError.message
      })
      return res
    }

    console.log(error)
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
