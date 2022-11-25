/**
 * Default props for remote components
 * @type {object}
 */
const ArcOptions = {
  app: {
    type: String,
    required: true
  },

  host: {
    type: String,
    default: 'localhost'
  },

  port: {
    type: Number,
    default: 3030
  },

  protocol: {
    type: String,
    default: 'http'
  },

  path: {
    type: String,
    default: ''
  },

  routeRemote: {
    type: String,
    required: true,
  },

  routeApp: {
    type: String,
    required: true
  }
}

export const ArcVueOptionsPlugin = {

  setOptions (Vue, options) {
    for (const [name, config] of Object.entries(ArcOptions)) {
      if (!Object.prototype.hasOwnProperty.call(ArcOptions, name)) {
        continue
      }

      const passedType = typeof options[name]
      const configuredType = config.type.name.toLowerCase()

      if (passedType === 'undefined') {
        if (config.required === true) {
          throw new Error(`The ArcOptions needs to be installed with the ${name} option.`)
        }

        this.options[name] = this.getOrAwaitValue(Vue, name, config.default)
        continue
      }

      if (passedType !== configuredType) {
        throw new Error(`The ArcOptions option ${name} must be of type ${config.type.name}.`)
      }

      this.options[name] = this.getOrAwaitValue(Vue, name, options[name])
    }
  },

  getOrAwaitValue (Vue, name, value) {
    if (typeof value !== 'function') {
      return value
    }

    let result = value()

    if (result instanceof Promise) {
      result.then(value => {
        Vue.prototype.$arcOptions[name] = value.default || value
      })
    }

    return result
  },

  install (Vue, options) {
    this.options = {}
    this.setOptions(Vue, options)

    Vue.prototype.$arcOptions = this.options
  }
}
