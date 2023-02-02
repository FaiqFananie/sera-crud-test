const chai = require('chai')
const QueuePayload = require('../QueuePayload')
const expect = chai.expect

describe('ExportPayload entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      queue: 'export:products'
    }

    // Action & Assert
    expect(() => new QueuePayload(payload)).to.throw('QUEUE_PAYLOAD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      queue: 'export:products',
      targetEmail: []
    }

    // Action & Assert
    expect(() => new QueuePayload(payload)).to.throw('QUEUE_PAYLOAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should throw error when payload not meet email format', () => {
    // Arrange
    const payload = {
      queue: 'export:products',
      targetEmail: 'faiqfananie'
    }

    // Action & Assert
    expect(() => new QueuePayload(payload)).to.throw('QUEUE_PAYLOAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create ExportPayload entities correctly', () => {
    // Arrange
    const payload = {
      queue: 'export:products',
      targetEmail: 'faiqfananie@email.com'
    }

    // Action
    const exportPayload = new QueuePayload(payload)

    // Assert
    expect(exportPayload).to.be.instanceOf(QueuePayload)
    expect(exportPayload.queue).to.equal(payload.queue)
    expect(exportPayload.targetEmail).to.equal(payload.targetEmail)
  })
})
