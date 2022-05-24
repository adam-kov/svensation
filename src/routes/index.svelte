<script lang="ts">
	import { goto } from "$app/navigation"
	import { Play } from 'lucide-svelte'
</script>

<div class="center-center flex-col row-start-2 lg:row-start-1 lg:col-start-2">
	<h2 class="mb-2 text-center">Want to see it in action?</h2>
	<p class="mb-4 text-center">
		Make sure to watch the URL bar as you step through the demo
	</p>
	<button class="btn" on:click={() => goto('/low-config')}>
		<span class="pr-1">Start demo</span>
		<Play size={20} />
	</button>
</div>