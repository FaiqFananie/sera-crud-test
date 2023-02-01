const DomainErrorTranslator = require('../DomainErrorTranslator')
const InvariantError = require('../InvariantError')
const chai = require('chai')
const expect = chai.expect

describe('DomainErrorTranslator', () => {
  it('should translate error correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('PRODUCT_PAYLOAD.NOT_CONTAIN_NEEDED_PROPERTY')))
      .to.eql(new InvariantError('tidak dapat membuat/mengubah produk karena properti yang dibutuhkan tidak ada'))
    expect(DomainErrorTranslator.translate(new Error('PRODUCT_PAYLOAD.NOT_MEET_DATA_TYPE_SPECIFICATION')))
      .to.eql(new InvariantError('tidak dapat membuat/mengubah produk karena tipe data tidak sesuai'))
  })

  it('should return original error when error message is not needed to translate', () => {
    // Arrange
    const error = new Error('some_error_message')

    // Action
    const translatedError = DomainErrorTranslator.translate(error)

    // Assert
    expect(translatedError).to.equal(error)
  })
})
