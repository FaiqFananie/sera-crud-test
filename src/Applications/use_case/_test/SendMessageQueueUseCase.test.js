const QueuePayload = require('../../../Domains/queues/entities/QueuePayload')
const SendMessageQueueUseCase = require('../SendMessageQueueUseCase')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const QueueRepository = require('../../../Domains/queues/QueueRepository')

describe('SendMessageQueueUseCase', () => {
  it('should orchestrating the send message to queue action correctly', async () => {
    // Arrange
    const useCasePayload = {
      queue: 'export:products',
      targetEmail: 'faiqfananie@email.com'
    }

    const stubQueueRepository = new QueueRepository()

    const stub = sinon.stub(stubQueueRepository, 'sendMessage').returns()

    const sendMessageQueueUseCase = new SendMessageQueueUseCase({
      queueRepository: stubQueueRepository
    })

    // Action
    await sendMessageQueueUseCase.execute(useCasePayload)

    // Assert
    expect(stub.calledWith(new QueuePayload({
      queue: useCasePayload.queue,
      targetEmail: useCasePayload.targetEmail
    }))).to.be.equal(true)
  })
})
