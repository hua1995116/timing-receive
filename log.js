//日志记录

var log4js = require('log4js')
// var config = require('../config')

log4js.addLayout('json', function(config) {
  return function(logEvent) {
    return JSON.stringify(logEvent.data[0])
  }
})

log4js.configure({
  appenders: {
    error: {
      type: 'dateFile',
      layout: { type: 'json' },
      pattern: '.yyyy-MM-dd',
      // keepFileExt: true,
      compress: true,
      filename: `log/application.log`
    }
  },
  categories: {
    default: { appenders: ['error'], level: 'error' }
  },
  pm2: true
})

module.exports = log4js.getLogger()