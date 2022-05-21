# Svensation

Create seamless page transitions in the browser with Svelte.

## Installation

```bash
npm i -D svensation
```

## Usage

**Import the component in the root of the pages**

In a `__layout.svelte` file for example

```html
<script>
  import Svensation from 'svensation'
</script>

<slot />
<Svensation />
```

**Configure it if you want to**

```html
<Svensation
  transitionAttributeName={'sn-transition'}
  transitionDuration={500}
  fadeDuration={200}
  loadTimeout={3000}
/>
```

> The example values are the defaults, see more in the [Props section](https://github.com/n00pper/svensation#props)

**Then mark the elements you want to be transitioned**

Elements on different pages with the same ID will be transitioned over to one another

```html
<!--
  File:  src/routes/items/index.svelte
  Route: /items
-->
<ul>
  {#each items as item}
    <li sn-transition={item.id + '-background'}>
      <a href={item.id}>
        <img src={item.image} sn-transition={item.id}>
        <div>
          {item.name}
        </div>
      </a>
    </li>
  {/each}
</ul>
```

```html
<!--
  File:  src/routes/items/{id}.svelte
  Route: /items/{id}
-->
<div sn-transition={item.id + '-background'}>
  <h1>{item.name}</h1>
  <img src={item.image} sn-transition={item.id}>
</div>
```

> Note: the values passed to the `sn-transition` attribute are IDs. They should be unique to a page, but have a counterpart on other pages. If the ID is not unique on a page, then the first found element won't be overwritten.

## Props

| Name | Description | Type | Default |
| ----------- | ----------- | ----------- | ----------- |
| transitionAttributeName | The name of the attribute that will receive the IDs | `string` | `'sn-transition'` |
| transitionDuration | The length of transitioning the elements **in milliseconds** | `number` | `300` |
| fadeDuration | The length of fading out the current page and fading in the next page **in milliseconds** | `number` | `200` |
| loadTimeout | The maximum time to wait to load the next page **in milliseconds** | `number` | `3000` |

## Navigation timeline

> The navigation will take `transitionDuration + fadeDuration` milliseconds

![Navigation timeline](/images/timeline.png)