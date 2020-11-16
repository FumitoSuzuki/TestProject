export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('getImage', (path) => {
    if (path) {
      return require(`~/static/${path}`)
    } else {
      return false
    }
  })
}
