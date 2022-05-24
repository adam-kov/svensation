# Configure to your liking

```svelte
<Svensation
	transitionAttributeName={'sn-transition'}
	transitionDuration={500}
	fadeDuration={200}
	loadTimeout={3000}
/>
```

## Props

| Name                    | Description                                                                               | Type     | Default           |
| ----------------------- | ----------------------------------------------------------------------------------------- | -------- | ----------------- |
| transitionAttributeName | The name of the attribute that will receive the IDs                                       | `string` | `'sn-transition'` |
| transitionDuration      | The length of transitioning the elements **in milliseconds**                              | `number` | `300`             |
| fadeDuration            | The length of fading out the current page and fading in the next page **in milliseconds** | `number` | `200`             |
| loadTimeout             | The maximum time to wait to load the next page **in milliseconds**                        | `number` | `3000`            |
