const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
const QueueRepository = require('../QueueRepository')
chai.use(chaiAsPromised)

describe('QueueRepository', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const queueRepository = new QueueRepository()

    // Assert
    await expect(queueRepository.sendMessage()).to.be.rejectedWith(Error, 'QUEUE_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  })
})
