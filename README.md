# Vue SVG Gauge (Vue 3)

An elegant, animated SVG gauge component for **Vue 3** with customizable gradients, transitions, and scaling.



## 🚀 Features

- **Vue 3 Support** ✨
- **Smooth Animations** via [Tween.js](https://github.com/tweenjs/tween.js/)
- **Gradient & Customizable Colors**
- **Flexible Props** to fine-tune gauge behavior
- **Slot Support** for custom content inside the gauge

## 📦 Installation

```sh
npm install vue3-svg-gauge@latest
```

```sh
yarn add vue3-svg-gauge
```

## ⚡ Quick Start

### Global Registration

```js
import { createApp } from 'vue';
import App from './App.vue';
import VueSvgGauge from 'vue3-svg-gauge';

const app = createApp(App);
app.use(VueSvgGauge);
app.mount('#app');
```

### Component Usage

```vue
<script setup>
  import { VueSvgGauge } from 'vue-svg-gauge';
</script>

<template>
  <VueSvgGauge
      :value="3"
      :min="0"
      :max="4"
      :start-angle="-110"
      :end-angle="110"
      :separator-step="1"
      :gauge-color="[
      { offset: 0, color: '#347AB0' },
      { offset: 100, color: '#8CDFAD' }
    ]"
      :scale-interval="0.1"
  />
</template>
```

## 🎨 Props

| Prop                 | Type         | Default                  | Description                                     |
| -------------------- | ------------ | ------------------------ | ----------------------------------------------- |
| `value`              | Number       | `70`                     | Current value of the gauge                      |
| `min`                | Number       | `0`                      | Minimum value                                   |
| `max`                | Number       | `100`                    | Maximum value                                   |
| `startAngle`         | Number       | `-90`                    | Gauge start angle                               |
| `endAngle`           | Number       | `90`                     | Gauge end angle                                 |
| `innerRadius`        | Number       | `60`                     | Inner radius (determines gauge thickness)       |
| `separatorStep`      | Number       | `10`                     | Steps between each separator (0 = no separator) |
| `gaugeColor`         | String/Array | `['#347AB0', '#8CDFAD']` | Single color or gradient array                  |
| `baseColor`          | String       | `#DDDDDD`                | Background color of empty gauge                 |
| `scaleInterval`      | Number       | `5`                      | Interval for scale lines                        |
| `transitionDuration` | Number       | `1500`                   | Animation duration in ms                        |
| `easing`             | String       | `Circular.Out`           | Easing function for animation                   |

## 🎭 Slot Support

Customize your gauge with a **slot** for custom content inside the gauge.

```vue
<VueSvgGauge :value="random" :separator-step="20" :scale-interval="10">
  <div class="gauge-content">🔥 Custom Content 🔥</div>
</VueSvgGauge>
```

```css
.gauge-content {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: red;
}
```

## 📖 Documentation & Demo

Check out the full documentation and live demo [here](https://hellocomet.github.io/vue-svg-gauge/).

## 🤝 Credits & License

Forked from [original vue-svg-gauge](https://github.com/hellocomet/vue-svg-gauge). Licensed under MIT. Made with ❤️ by the Vue community.

