# ARCS Remotes

This repository provides a Vue.js plugin that makes ARCS options globally accessible. 

## Installation

Use one of the following:

```bash
yarn add arcs-vr/arc-vue-options-plugin
npm install arcs-vr/arc-vue-options-plugin
git clone https://github.com/arcs-vr/arc-vue-options-plugin
```

## Usage

```js
// main.js

import Vue                  from 'vue'
import { ArcVueOptionsPlugin } from 'arc-vue-options-plugin'
import { config }           from './arc-config.js'

Vue.use(ArcVueOptionsPlugin, config)
```

```js
// arc-config.js

export const config = {
  app: 'arcs-vr-demo',
  protocol: 'wss',
  host: 'test.mosquitto.org',
  port: 8083,
  routeApp: 'index',
  routeRemote: 'remote-selector',
}
```

You can find the configuration and its default values below.
Each option can by either the type it declares, a function that returns a value of said type, or a function that returns
a Promise that resolve a value of said type.

```js
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

  routeRemote: {
    type: String,
    required: true,
  },

  routeApp: {
    type: String,
    required: true
  }
}
```

The components provided in this package, and you yourself can access these properties from within each vue.js component
using the `$arcOptions` Vue.js prototype property:

```vue
<router-link :to="{name: $arcOptions.routeRemote}">Example link to the remote control selection route.</router-link>
``` 

## Styling

You can easily replace most of the styling by overriding the [`arcs-vr/arc-ci`](https://github.com/arcs-vr/arc-ci)
package, for example using the [`nerdchacha/module-replace-webpack-plugin`](https://github.com/nerdchacha/module-replace-webpack-plugin)
in webpack.

If you want to use the default styling, you must manually install the [`arcs-vr/arc-ci`](https://github.com/arcs-vr/arc-ci).

## More

Look at the [`arcs-vr/arc-aframe-vue-template`](https://github.com/arcs-vr/arc-aframe-vue-template) for easier setup and at the
[`arc-aframe-vue-demo`](https://github.com/arcs-vr/arc-aframe-vue-demo) for example usage.
