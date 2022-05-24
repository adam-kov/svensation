<script lang="ts">
	import '../app.css'
	import { fade } from 'svelte/transition'
	import { goto } from '$app/navigation'
	import Svensation from '$lib/index'
	import { Header } from '$doc'

	let script: HTMLElement
	let copied = false
	$: scriptText = script?.textContent
	$: if(copied) setTimeout(() => copied = false, 3000)

	const copy = () => {
		navigator.clipboard.writeText(scriptText)
		copied = true
	}
</script>

<svelte:head>
	<title>Svensation</title>
</svelte:head>

<Header />
<main class="m-8 bg-slate-50">
	<h1 class="text-center mb-10">Create seamless page transitions<br>in the browser with Svelte</h1>
	
	<div class="center-center flex-col">
		<button class="mb-2" on:click={copy}>
			<pre class="center-center">
				<code bind:this={script}>npm i -D svensation</code>
			</pre>
		</button>
		<div class="mb-20 h-[24px]">
			{#if copied}
				<div transition:fade={{ duration: 200 }} class="text-center">
					Copied to clipboard!
				</div>
			{/if}
		</div>
		<div class="grid grid-rows-3 grid-cols-1 gap-y-6 
		lg:grid-rows-1 lg:grid-cols-3 lg:gap-x-6 
		min-h-[250px] mb-20">
			<slot />
		</div>
		<h2 class="mb-4 text-center">Check out the documentation</h2>
		<button class="btn" on:click={() => goto('/docs')}>
			See the docs
		</button>
	</div>
</main>


<Svensation />
