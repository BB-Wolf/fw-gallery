import SeoAuthor from '@main/api/seo/methods/SetAuthor.js'
import SeoDescription from '@main/api/seo//methods/SetDescription.js'
import SeoKeywords from '@main/api/seo/methods/SetKeywords.js'
import SeoTitle from '@main/api/seo/methods/SetTitle.js'
import PageCanonical from '@main/api/seo/methods/SetCanonical'

export default {
  setPageSeo(title, description, author, keywords) {
    if (title) {
      SeoTitle.setTitle(title)
    }
    if (description) {
      SeoDescription.setDescription(description)
    }
    if (author) {
      SeoAuthor.setPageAuthor(author)
    }
    if (keywords) {
      SeoKeywords.setPageKeywords(keywords)
    }
  },
  setPageCanonical(url) {
    PageCanonical.setPageCanonical(url)
  }
}
