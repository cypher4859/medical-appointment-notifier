const path = require('path')
module.exports = {
  'css': {
    'loaderOptions': {
      'scss': {
        'prependData': '@import "@/styles/variables.scss";'
      }
    }
  },
  'transpileDependencies': [
  ],
  'pluginOptions': {
    'electronBuilder': {
      'nodeIntegration': true, // this may or may not be necessary - you can try without it
      'externals': ['electron-edge-js', 'edge-js', 'node-odbc'] // this excludes the node-pty from the front end
    }
  }
}
