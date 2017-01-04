import shellArguments from 'shell-arguments'

const configs = {
  test: {
    port: 4000,
  },
  development: {
    port: process.env.PORT || 4000,
  },
  production: {
    port: 4000,
  },
}

const env = shellArguments.env || process.env.NODE_ENV || 'production'

module.exports = configs[env]
