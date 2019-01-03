const config = require('./config')
const { lstatSync, readdirSync } = require('fs')
const { basename, join } = require('path')

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

module.exports = {
  getFilesAndFolders: () => {
    const downloadDirectory = config.downloadsDirectory;
    const mediaDirectoryNames = getDirectories(downloadDirectory).map(dir => basename(dir));
    
    return {
      mediaDirectoryNames
    }
  }
}