const { expect } = require('chai')
const WinstonLogger = require('../WinstonLogger')
const winston = require('../../winston')
const sinon = require('sinon')

describe('WinstonLogger', () => {
  describe('Print Log', () => {
    it('should print log correctly', () => {
      // Arrange
      const spyWinston = sinon.spy(winston, 'error')
      const winstonLogger = new WinstonLogger(winston)

      // Action
      const detail = winstonLogger.printLog('/test', 400, 'GET', '127.0.0.1', 'Error')

      // Assert
      expect(detail).to.equal('{ "url": "/test", "code": 400, "method": "GET", "ip": "127.0.0.1", "message": "Error"}')
      expect(spyWinston.calledOnce).to.equal(true)
    })

    it('should print log with no parameter correctly', () => {
      // Arrange
      const winstonLogger = new WinstonLogger(winston)

      // Action
      const detail = winstonLogger.printLog()

      // Assert
      expect(detail).to.equal('{ "url": "", "code": 0, "method": "", "ip": "", "message": ""}')
    })
  })
})
