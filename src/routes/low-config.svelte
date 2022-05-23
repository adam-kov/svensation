<script lang="ts">
	import { DemoCard } from "$doc"
</script>

<DemoCard nextUrl="/performant" position={1}>
	<span slot="title">Low config</span>
	<div slot="description">
		You only need to mark HTML elements you want to transition.
		<br>
		The rest is taken care for you.
	</div>
</DemoCard>