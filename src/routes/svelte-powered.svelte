<script lang="ts">
	import { DemoCard } from "$doc"
</script>

<DemoCard nextUrl="/performant" position={1} ghost>
	<svelte:fragment slot="title">Low config</svelte:fragment>
	<svelte:fragment slot="description">
		You only need to mark HTML elements you want to transition.
		<br>
		The rest is taken care for you.
	</svelte:fragment>
</DemoCard>

<DemoCard nextUrl="/a" prevUrl="/low-config" position={2} ghost>
	<svelte:fragment slot="title">Performant</svelte:fragment>
	<svelte:fragment slot="description">
		It operates natively with the DOM.
		<br>
		And the package is only ~20 kB.
	</svelte:fragment>
</DemoCard>

<DemoCard prevUrl="/performant" position={3}>
	<svelte:fragment slot="title">Powered by Svelte</svelte:fragment>
	<svelte:fragment slot="description">
		Created for Svelte.
		<br>
		In Svelte.
	</svelte:fragment>
</DemoCard>