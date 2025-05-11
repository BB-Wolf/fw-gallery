export default {
  setPageAuthor(author) {
    if (typeof window !== 'undefined') {
      const meta = document.querySelector('meta[name="author"]')
      if (meta) {
        meta.setAttribute('content', author)
      } else {
        const newMeta = document.createElement('meta')
        newMeta.name = 'author'
        newMeta.content = author
        document.head.appendChild(newMeta)
      }
    }
  }
}
