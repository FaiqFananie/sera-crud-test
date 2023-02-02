const InvariantError = require('./InvariantError')

const DomainErrorTranslator = {
  translate (error) {
    return DomainErrorTranslator._directories[error.message] || error
  }
}

DomainErrorTranslator._directories = {
  'PRODUCT_PAYLOAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat/mengubah produk karena properti yang dibutuhkan tidak ada'),
  'PRODUCT_PAYLOAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat/mengubah produk karena tipe data tidak sesuai'),
  'QUEUE_PAYLOAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat menambahkan antrean karena properti yang dibutuhkan tidak ada'),
  'QUEUE_PAYLOAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat menambahkan antrean produk karena tipe data tidak sesuai')
}

module.exports = DomainErrorTranslator
