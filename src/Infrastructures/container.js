/* istanbul ignore file */

const { createContainer } = require('instances-container')

// external agency
const { nanoid } = require('nanoid')
const pool = require('./database/postgres/pool')
const winston = require('./winston')

const ProductRepository = require('../Domains/products/ProductRepository')
const ProductRepositoryPostgres = require('../Infrastructures/repository//ProductRepositoryPostgres')
const AddProductUseCase = require('../Applications/use_case/AddProductUseCase')
const EditProductUseCase = require('../Applications/use_case/EditProductUseCase')
const GetProductUseCase = require('../Applications/use_case/GetProductUseCase')
const Logger = require('../Applications/debug/Logger')
const WinstonLogger = require('./debug/WinstonLogger')
const GetAllProductsUseCase = require('../Applications/use_case/GetAllProductsUseCase')

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
  },
  {
    key: EditProductUseCase.name,
    Class: EditProductUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'productRepository',
          internal: ProductRepository.name
        }
      ]
    }
  },
  {
    key: GetProductUseCase.name,
    Class: GetProductUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'productRepository',
          internal: ProductRepository.name
        }
      ]
    }
  },
  {
    key: GetAllProductsUseCase.name,
    Class: GetAllProductsUseCase,
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
