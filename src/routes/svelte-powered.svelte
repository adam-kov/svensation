<script lang="ts">
	import { DemoCard } from "$doc"
</script>

<DemoCard nextUrl="/performant" position={1} ghost>
	<span slot="title">Low config</span>
	<div slot="description">
		You only need to mark HTML elements you want to transition.
		<br>
		The rest is taken care for you.
	</div>
</DemoCard>

<DemoCard nextUrl="/a" prevUrl="/low-config" position={2} ghost>
	<span slot="title">Performant</span>
	<div slot="description">
		It operates natively with the DOM.
		<br>
		And the package is only ~20 kB.
	</div>
</DemoCard>

<DemoCard prevUrl="/performant" position={3}>
	<span slot="title">Powered by Svelte</span>
	<div slot="description">
		Created for Svelte.
		<br>
		In Svelte.
	</div>
</DemoCard>