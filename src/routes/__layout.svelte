<script lang="ts">
	import '../app.css'
	import { goto } from '$app/navigation'
	import Svensation from '$lib/index'
	import { Header } from '$doc'
</script>

<Header />
<main class="m-8 bg-slate-50">
	<h1 class="text-center mb-10">Create seamless page transitions<br>in the browser with Svelte</h1>
	
	<div class="center-center flex-col">
		<pre class="center-center mb-20">
			<code>npm i -D svensation</code>
		</pre>
		<div class="grid grid-rows-1 grid-cols-3 gap-x-6 min-h-[250px] mb-20">
			<slot />
		</div>
		<button class="btn" on:click={() => goto('/doc')}>
			See the documentation
		</button>
	</div>
</main>


<Svensation fadeDuration={0} />
