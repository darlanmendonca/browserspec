import {port} from './config.js'
import express from 'express'
import proxy from 'express-http-proxy'
import gzip from 'compression'
import url from 'url'

const server = express()
// const route = 'http://localhost:3000/demo.html'
const route = 'https://minimalist-components.github.io/mn-select/'

const options = {
  forwardPath(req, res) {
    if (req.path === '/') {
      return url.parse(route).path
    }
  }
}

server
  .use(gzip())
  .use('/', proxy(route, options))
  .listen(port)

module.exports = server

