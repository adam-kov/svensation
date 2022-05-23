<script lang="ts">
	import { goto } from "$app/navigation"
</script>

<div class="center-center flex-col col-start-2">
	<h2 class="mb-4">Want to see it action?</h2>
	<button class="btn" on:click={() => goto('/low-config')}>Start demo</button>
</div>