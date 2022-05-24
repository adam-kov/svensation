<script lang="ts">
	import { goto } from "$app/navigation"

	export let position: 1 | 2 | 3
	export let nextUrl: string = ''
	export let prevUrl: string = ''
	export let ghost: boolean = false

	const gridPos = [
		'row-start-1 lg:row-start-1 lg:col-start-1',
		'row-start-2 lg:row-start-1 lg:col-start-2',
		'row-start-3 lg:row-start-1 lg:col-start-3',
	]
</script>

<div sn-transition={ghost ? undefined : 'demo'} class={`center-center flex-col rounded-2xl 
text-slate-50 w-full max-w-[340px] px-10 py-6 mr-auto 
${ghost ? 'bg-slate-600/50' : 'bg-slate-600'} ${gridPos[position - 1]}`}>
	<h2 class="mb-4 text-center">
		<slot name="title" />
	</h2>
	<p class="mb-4 text-center">
		<slot name="description" />
	</p>
	<div class="flex flex-wrap justify-between">
		{#if prevUrl}
			<button disabled={ghost} class="btn" on:click={() => goto(prevUrl)}>
				Back
			</button>
		{/if}
		{#if nextUrl}
			<button disabled={ghost} class="btn" on:click={() => goto(nextUrl)}>
				Continue
			</button>
		{/if}
	</div>
</div>