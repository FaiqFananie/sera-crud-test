# BackendTest SERA

## Environment
- Programming Language: JavaScript
- Web Framework: Express
- Database: Postgres
- Unit Test: Mocha
- Code Standarization: eslint

## Getting Started
1. Install all library NPM with `npm install`
2. Configure .env file at `.env.copy` rename it to `.env`
3. Migrate Table Database:
  - Run Command `npm run migrate up` 

## Understand this workspace

- Postman Documentation: `SERA-crud-test.postman_collection.json`
- Postman Environment: `SERA-crud-test.postman_environment.json`
- Unit Test: `npm run test || npm run test:watch`
- Run Lint: `npm run lint`

## Run Server

`npm run start || npm run start:dev`

