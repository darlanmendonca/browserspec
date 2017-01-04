import open from 'open'
import {argv} from 'yargs'
import {port} from './config.js'

module.exports = openBrowser

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
