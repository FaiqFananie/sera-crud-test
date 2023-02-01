const Logger = require('../Logger')
const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('Logger', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const logger = new Logger()

    // Assert
    await expect(logger.printLog()).to.be.rejectedWith(Error, 'LOGGER.METHOD_NOT_IMPLEMENTED')
  })
})
