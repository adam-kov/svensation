<script lang="ts">
	import { DemoCard } from "$doc"
</script>

<DemoCard nextUrl="/performant" position={1}>
	<svelte:fragment slot="title">Low config</svelte:fragment>
	<svelte:fragment slot="description">
		You only need to mark HTML elements you want to transition.
		<br>
		The rest is taken care for you.
	</svelte:fragment>
</DemoCard>