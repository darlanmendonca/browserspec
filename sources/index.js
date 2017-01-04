import {port, corporateProxy} from './config.js'
import express from 'express'
import gzip from 'compression'
import url from 'url'
import {argv} from 'yargs'
import open from 'open'
import proxy from './proxy.js'

const server = express()
const validUrl = typeof argv.url === 'string' && url.parse(argv.url)

if (!validUrl) {
  console.error('url is required, eg. `browserspec --url localhost:3000`')
  process.exit()
}

server
  .use(gzip())
  .use('/', proxy())
  .listen(port, openBrowser)

function openBrowser() {
  const browsers = [
    'google chrome',
    'firefox',
    'safari',
  ]

  const route = `http://localhost:${port}`
  const browser = argv.browser && browsers.indexOf(argv.url)
    ? argv.browser
    : undefined

  open(route, browser)
}

module.exports = server

