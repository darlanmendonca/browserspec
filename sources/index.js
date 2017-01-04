import {port, corporateProxy} from './config.js'
import express from 'express'
import proxy from 'express-http-proxy'
import HttpsProxyAgent from 'https-proxy-agent'
import gzip from 'compression'
import url from 'url'
import {argv} from 'yargs'
import open from 'open'

const server = express()
const validUrl = typeof argv.url === 'string' && url.parse(argv.url)

if (!validUrl) {
  console.error('url is required, eg. `browserspec --url localhost:3000`')
  process.exit()
}

const options = {
  forwardPath(req) {
    if (req.path === '/') {
      return url.parse(argv.url).path
    }
  },
  decorateRequest(req) {
    if (corporateProxy) {
      const proxyAgent = new HttpsProxyAgent(corporateProxy)
      req.agent = proxyAgent
    }

    return req
  },
}

server
  .use(gzip())
  .use('/', proxy(argv.url, options))
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

