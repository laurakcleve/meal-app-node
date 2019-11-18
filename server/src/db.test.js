const db = require('./db')

test('db connects', () => {
  expect.assertions(1)
  return db.query('SELECT NOW()').then((results) => {
    return expect(results.rows).not.toBeNull()
  })
})

test('db returns data from the database', () => {
  expect.assertions(1)
  return db.query('SELECT * FROM item').then((results) => {
    return expect(results.rows).not.toBeNull()
  })
})

afterAll(() => {
  return db.end()
})
