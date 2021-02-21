import { DirectiveBinding } from 'vue/types/options'

type onIntersectFunction = (isIntersecting: boolean) => void

interface HTMLBaseElementWithObserver extends HTMLBaseElement {
  _intersectionObserver?: IntersectionObserver
  _onIntersect?: onIntersectFunction
}

const setObserver = (el: HTMLBaseElementWithObserver, observer?: IntersectionObserver, onIntersect?: onIntersectFunction) => {
  el._intersectionObserver = observer
  el._onIntersect = onIntersect
}

function hasOwnProperty<X extends unknown, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

const extractOptions = (options: unknown) => {
  let observer: IntersectionObserver | undefined = undefined
  let onIntersect: onIntersectFunction | undefined = undefined
  if (options instanceof IntersectionObserver) {
    observer = options
  } else if (options && typeof options === 'object' && hasOwnProperty(options, 'observer') && options.observer instanceof IntersectionObserver) {
    observer = options.observer
    if (hasOwnProperty(options, 'onIntersect') && options.onIntersect instanceof Function) {
      onIntersect = options.onIntersect as onIntersectFunction
    }
  }
  return { observer, onIntersect }
}

export default {
  mounted(el: HTMLBaseElement, { value: options }: DirectiveBinding) {
    const { observer, onIntersect } = extractOptions(options)
    if (observer instanceof IntersectionObserver) {
      observer.observe(el)
    }
    setObserver(el, observer, onIntersect)
  },
  updated(el: HTMLBaseElementWithObserver, { value: newOptions }: DirectiveBinding) {
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
  beforeUnmount(el: HTMLBaseElementWithObserver) {
    const cached = el._intersectionObserver
    if (cached instanceof IntersectionObserver) {
      cached.unobserve(el)
    }
    setObserver(el, undefined, undefined)
  }
}
