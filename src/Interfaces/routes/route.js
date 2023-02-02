const ErrorHandler = require('./handlers/ErrorHandler')
const ExportHandler = require('./handlers/ExportHandler')
const ProductHandler = require('./handlers/ProductHandler')

const routes = (app, container) => {
  const productHandler = new ProductHandler(container)
  const exportHandler = new ExportHandler(container)
  const errorHandler = new ErrorHandler(container)

  app.get('/', (_, res) => {
    res.json('hello world')
  })

  // Product
  app.route('/api/products')
    .post(productHandler.postProductHandler)
    .get(productHandler.getAllProductsHandler)
    .all(errorHandler.responseMethodNotAllowed)
  app.route('/api/products/:id')
    .get(productHandler.getProductHandler)
    .put(productHandler.putProductHandler)
    .delete(productHandler.deleteProductHandler)
    .all(errorHandler.responseMethodNotAllowed)

  // Export
  app.route('/api/exports/products')
    .post(exportHandler.postExportProductsHandler)

  app.use(errorHandler.responseError)
}

module.exports = routes
