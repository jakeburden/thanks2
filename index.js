const pacote = require('pacote')
const logicalTree = require('npm-logical-tree')

const pkg = require('./package.json')
const pkgLock = require('./package-lock.json')

const tree = logicalTree(pkg, pkgLock)

function loop () {
  tree.forEach(async (node, cb) => {
    const dep = `${node.name}@${node.version}`
    try {
      const manifest = await pacote.manifest(dep, {'full-metadata': true})
      const obj = {
        name: manifest.name,
        maintainers: manifest.maintainers
      }
      console.log(obj)
    } catch (e) {
      console.error(e)
    }
    cb()
  })
}

module.exports = loop
