const setObserver = (el, observer, onIntersect) => {
  el._intersectionObserver = observer
  el._onIntersect = onIntersect
}

const extractOptions = (options) => {
  let observer
  let onIntersect
  if (options instanceof IntersectionObserver) {
    observer = options
  } else if (options && typeof options === 'object' && Object.prototype.hasOwnProperty.call(options, 'observer') && options.observer instanceof IntersectionObserver) {
    observer = options.observer
    if (Object.prototype.hasOwnProperty.call(options, 'onIntersect') && options.onIntersect instanceof Function) {
      onIntersect = options.onIntersect
    }
  }
  return { observer, onIntersect }
}

export default {
  mounted (el, { value: options }) {
    const { observer, onIntersect } = extractOptions(options)
    if (observer instanceof IntersectionObserver) {
      observer.observe(el)
    }
    setObserver(el, observer, onIntersect)
  },
  updated (el, { value: newOptions }) {
    const { observer: newObserver, onIntersect: newOnIntersect } = extractOptions(newOptions)
    const oldObserver = el._intersectionObserver
    const isOldObserver = oldObserver instanceof IntersectionObserver
    const isNewObserver = newObserver instanceof IntersectionObserver

    if (!isOldObserver && !isNewObserver) {
      return false
    }

    if (isOldObserver && isNewObserver && (oldObserver === newObserver)) {
      setObserver(el, newObserver, newOnIntersect)
      return false
    }

    if (oldObserver && isOldObserver) {
      oldObserver.unobserve(el)
      setObserver(el, undefined, undefined)
    }

    if (newObserver && isNewObserver) {
      newObserver.observe(el)
      setObserver(el, newObserver, newOnIntersect)
    }
  },
  beforeUnmount (el) {
    const cached = el._intersectionObserver
    if (cached instanceof IntersectionObserver) {
      cached.unobserve(el)
    }
    setObserver(el, undefined, undefined)
  }
}
