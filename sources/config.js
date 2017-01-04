import shellArguments from 'shell-arguments'

const corporateProxy = process.env.http_proxy || process.env.https_proxy

const configs = {
  test: {
    port: 4000,
    corporateProxy,
  },
  development: {
    port: process.env.PORT || 4000,
    corporateProxy,
  },
  production: {
    port: 4000,
    corporateProxy,
  },
}

const env = shellArguments.env || process.env.NODE_ENV || 'production'

module.exports = configs[env]
