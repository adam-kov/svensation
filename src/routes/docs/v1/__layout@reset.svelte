<script lang="ts">
	import '../markdown.css'
	import '../prism-theme.css'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { ChevronLeft, ChevronRight } from 'lucide-svelte'
	import { Header, Menu, MenuTitle, MenuItem } from '$doc'

	interface Page {
		url: string
		title: string
	}
	interface CurrentPage extends Page {
		index: number
	}

	const baseUrl = '/docs/v1'
	const pages = [
		{
			title: 'Basics'
		},
		{
			url: '/install',
			title: 'Installation'
		},
		{
			url: '/usage',
			title: 'Usage'
		},
		{
			url: '/configuration',
			title: 'Configuration'
		},
		// {
		// 	title: 'Examples'
		// },
	]
	let currentPage: CurrentPage, prevPage: Page, nextPage: Page

	$: {
		const index = pages.findIndex(p => $page.url.pathname.endsWith(p.url))
		if(index >= 0) {
			currentPage = { ...pages[index], index } as CurrentPage
		}
	}
	$: if(currentPage) {
		prevPage = undefined
		for(let i = currentPage.index - 1; i >= 0; i--) {
			if(pages[i].url) {
				prevPage = pages[i] as Page
				break
			}
		}
	}
	$: if(currentPage) {
		nextPage = undefined
		for(let i = currentPage.index + 1; i < pages.length; i++) {
			if(pages[i].url) {
				nextPage = pages[i] as Page
				break
			}
		}
	}

	const prev = () => goto(baseUrl + prevPage.url)

	const next = () => goto(baseUrl + nextPage.url)
</script>

<svelte:head>
	<title>Svensation - Docs v1</title>
</svelte:head>

<Header />
<div class="flex">
	<Menu>
		{#each pages as {url, title}}
			{#if url}
				<MenuItem href={baseUrl + url}>{title}</MenuItem>
			{:else}
				<MenuTitle>{title}</MenuTitle>
			{/if}
		{/each}
	</Menu>
	<main class="relative p-4 pt-0 w-full max-w-[1000px] mx-auto h-max-content overflow-y-auto">
		<div class="sticky z-40 top-0 bg-slate-50 flex flex-wrap-reverse justify-between mb-6 py-2">
			{#if prevPage}
				<button class="btn ml-0" on:click={prev}>
					<ChevronLeft />
					Back to {prevPage.title}
				</button>
			{:else}
				<span></span>
			{/if}
			{#if nextPage}
				<button class="btn mr-0" on:click={next}>
					Continue to {nextPage.title}
					<ChevronRight />
				</button>
			{/if}
		</div>
		<slot />
	</main>
</div>