const pg = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const db = new pg.Client()

db.connect()

module.exports = db
