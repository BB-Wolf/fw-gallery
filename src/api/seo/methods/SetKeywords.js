export default {
  setPageKeywords(keywords) {
    if (typeof window !== 'undefined') {
      const meta = document.querySelector('meta[name="keywords"]')
      if (meta) {
        meta.setAttribute('content', keywords)
      } else {
        const newMeta = document.createElement('meta')
        newMeta.name = 'keywords'
        newMeta.content = keywords
        document.head.appendChild(newMeta)
      }
    }
  }
}
