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

<DemoCard nextUrl="/svelte-powered" prevUrl="/low-config" position={2}>
	<span slot="title">Performant</span>
	<div slot="description">
		It operates natively with the DOM.
		<br>
		And the package is only ~20 kB.
	</div>
</DemoCard>