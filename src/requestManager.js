class RequestManager {
  activeRequests = new Map()

  async call(client, method, url, data = null, config = null, onSuccess = null, onError = null) {
    data ??= {}
    config ??= {}
    const key = `${method.toLowerCase()}:${url}`
    if (this.activeRequests.has(key)) {
      return this.activeRequests.get(key).processed
    }
    const processRequest = async (responsePromise) => {
      try {
        const requestResult = await responsePromise
        const callbackResult =
          onSuccess && typeof onSuccess === 'function' ? onSuccess(requestResult) : undefined
        return callbackResult !== undefined ? callbackResult : requestResult
      } catch (err) {
        if (onError && typeof onError === 'function') {
          onError(err)
          return
        }
        throw err
      }
    }
    const requestPromise = client.request({ ...config, method, url, data }).finally(() => {
      this.activeRequests.delete(key)
    })
    const processedPromise = processRequest(requestPromise)
    this.activeRequests.set(key, { original: requestPromise, processed: processedPromise })
    return processedPromise
  }
}

export default new RequestManager()
