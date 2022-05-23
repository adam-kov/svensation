<script lang="ts">
	import { page } from "$app/stores"


	export let href: string
	$: isCurrent = $page.url.pathname.endsWith(href)
	console.log();
</script>

<li class="mb-1">
	<a {href} class="inline-block w-full h-full align-middle 
	p-4 pl-8 duration-200 hover:bg-slate-200"
	class:!bg-slate-700={isCurrent}
	class:!text-slate-50={isCurrent}>
		<slot />
	</a>
</li>