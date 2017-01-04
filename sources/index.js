import {port} from './config.js'
import express from 'express'
import proxy from 'express-http-proxy'
import gzip from 'compression'
import url from 'url'
import {argv} from 'yargs'

const server = express()
const validUrl = typeof argv.url === 'string' && url.parse(argv.url)

if (!validUrl) {
  console.error('url is required, eg. `browserspec --url localhost:3000`')
  process.exit()
}

const options = {
  forwardPath(req, res) {
    if (req.path === '/') {
      return url.parse(argv.url).path
    }
  }
}

server
  .use(gzip())
  .use('/', proxy(argv.url, options))
  .listen(port)

module.exports = server

