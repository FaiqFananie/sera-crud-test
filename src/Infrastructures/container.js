/* istanbul ignore file */

const { createContainer } = require('instances-container')

// external agency
const { nanoid } = require('nanoid')
const pool = require('./database/postgres/pool')
const winston = require('./winston')

const ProductRepository = require('../Domains/products/ProductRepository')
const ProductRepositoryPostgres = require('../Infrastructures/repository//ProductRepositoryPostgres')
const AddProductUseCase = require('../Applications/use_case/AddProductUseCase')
const Logger = require('../Applications/debug/Logger')
const WinstonLogger = require('./debug/WinstonLogger')

// creating container
const container = createContainer()

// registering services and repository
container.register([
  {
    key: ProductRepository.name,
    Class: ProductRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool
        },
        {
          concrete: nanoid
        }
      ]
    }
  },
  {
    key: Logger.name,
    Class: WinstonLogger,
    parameter: {
      dependencies: [
        {
          concrete: winston
        }
      ]
    }
  }
])

// registering use cases
container.register([
  {
    key: AddProductUseCase.name,
    Class: AddProductUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'productRepository',
          internal: ProductRepository.name
        }
      ]
    }
  }
])

module.exports = container
