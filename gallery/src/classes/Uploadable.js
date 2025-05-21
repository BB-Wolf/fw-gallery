class Uploadable {
  setTitle(title) {
    this.title = title
  }

  setImage(file) {
    this.file = file
  }

  setDescription(description) {
    this.description = description
  }

  setRate(rate) {
    this.rate = rate
  }
  setTags(tags) {
    this.tags = tags
  }

  setCharacters(charlist) {
    this.characters = charlist
  }
}

export default new Uploadable()
