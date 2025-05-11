export default {
  setPageCanonical: function (url) {
    if (typeof url !== 'string') {
      throw new Error('URL must be a string')
    }
    const link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    link.setAttribute('href', url)
    document.head.appendChild(link)
  }
}
