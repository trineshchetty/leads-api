'use strict'
require('dotenv').config();

const { Pool } = require("pg")


// SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true
}

// connect to db
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Trinesh1997@@localhost:5432/leadsapi'

const pool = new Pool({
  connectionString,
  ssl: useSSL
})

pool.on("error", (err, client) => 
{
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})


var database = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    },
}




module.exports = database