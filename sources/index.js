import express from 'express'
import gzip from 'compression'
import {port} from './config.js'

const server = express()

server
  .use(gzip())
  .listen(port, () => console.info(`localhost:${port}`))

module.exports = server

