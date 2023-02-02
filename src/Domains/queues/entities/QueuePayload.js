class QueuePayload {
  constructor (payload) {
    this._verifyPayload(payload)

    this.queue = payload.queue
    this.targetEmail = payload.targetEmail
  }

  _verifyPayload (payload) {
    const { queue, targetEmail } = payload
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi

    if (!queue || !targetEmail) {
      throw new Error('QUEUE_PAYLOAD.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof queue !== 'string' || typeof targetEmail !== 'string' || regexExp.test(targetEmail) !== true) {
      throw new Error('QUEUE_PAYLOAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
    console.log(regexExp.test(targetEmail))
  }
}

module.exports = QueuePayload
