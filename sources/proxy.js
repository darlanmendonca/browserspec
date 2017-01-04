import proxy from 'express-http-proxy'
import HttpsProxyAgent from 'https-proxy-agent'
import url from 'url'
import {argv} from 'yargs'

module.exports = () => {
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

  return proxy(argv.url, options)
}

