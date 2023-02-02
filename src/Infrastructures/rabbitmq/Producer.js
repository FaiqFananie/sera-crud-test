/* istanbul ignore file */

const QueueRepository = require('../../Domains/queues/QueueRepository')

class ProducerService extends QueueRepository {
  constructor (broker) {
    super()
    this._broker = broker
  }

  async sendMessage (payload) {
    const { queue, targetEmail } = payload
    const connection = await this._broker.connect(process.env.RABBITMQ_SERVER)
    const channel = await connection.createChannel()
    await channel.assertQueue(queue, {
      durable: true
    })

    await channel.sendToQueue(queue, Buffer.from(targetEmail))

    setTimeout(() => {
      connection.close()
    }, 1000)
  }
}

module.exports = ProducerService
