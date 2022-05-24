# Usage

1. **Import the component in the root of the pages**

   In a `__layout.svelte` file for example

   ```svelte
   <script>
   	import Svensation from 'svensation'
   </script>

   <slot />
   <Svensation />
   ```

1. **Then mark the elements you want to be transitioned**

   Elements on different pages with the same ID will be transitioned over to one another

   ```svelte
   <!--
   	File:  src/routes/items/index.svelte
   	Route: /items
   -->
   <ul>
   	{#each items as item}
   		<li sn-transition={item.id + '-background'}>
   			<a href={item.id}>
   				<img src={item.image} sn-transition={item.id} />
   				<div>
   					{item.name}
   				</div>
   			</a>
   		</li>
   	{/each}
   </ul>
   ```

   ```svelte
   <!--
   	File:  src/routes/items/{id}.svelte
   	Route: /items/{id}
   -->
   <div sn-transition={item.id + '-background'}>
   	<h1>{item.name}</h1>
   	<img src={item.image} sn-transition={item.id} />
   </div>
   ```

> Note: the values passed to the `sn-transition` attribute are IDs. They should be unique to a page, but have a counterpart on other pages. If the ID is not unique on a page, then the first found element won't be overwritten.
