const QueuePayload = require('../../Domains/queues/entities/QueuePayload')

class SendMessageQueueUseCase {
  constructor ({ queueRepository }) {
    this._queueRepository = queueRepository
  }

  async execute (payload) {
    const queuePayload = new QueuePayload(payload)
    return this._queueRepository.sendMessage(queuePayload)
  }
}

module.exports = SendMessageQueueUseCase
