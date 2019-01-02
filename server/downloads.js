const config = require('./config')

module.exports = {
  getFilesAndFolders: () => {
    const downloadDirectory = config.downloadsDirectory;
    
    return {
      files: '/something'
    }
  }
}