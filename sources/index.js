import express from 'express'
import url from 'url'
import {argv} from 'yargs'
import {port} from './config.js'
import proxy from './proxy.js'
import openBrowser from './open-browser.js'

const server = express()
const validUrl = typeof argv.url === 'string' && url.parse(argv.url)

if (!validUrl) {
  console.error('url is required, eg. `browserspec --url localhost:3000`')
  process.exit()
}

server
  .use('/', proxy())
  .listen(port, openBrowser)

module.exports = server

