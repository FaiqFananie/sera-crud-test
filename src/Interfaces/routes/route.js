const ErrorHandler = require('./handlers/ErrorHandler')
const ProductHandler = require('./handlers/ProductHandler')

const routes = (app, container) => {
  const productHandler = new ProductHandler(container)
  const errorHandler = new ErrorHandler(container)

  app.get('/', (_, res) => {
    res.json('hello world')
  })

  // User
  app.route('/api/products')
    .post(productHandler.postProductHandler)
    .all(errorHandler.responseMethodNotAllowed)
  app.route('/api/products/:id')
    .put(productHandler.putProductHandler)
    .get(productHandler.getProductHandler)
    .all(errorHandler.responseMethodNotAllowed)

  app.use(errorHandler.responseError)
}

module.exports = routes
