<script lang="ts">
	import { Header, Menu, MenuItem } from '$doc'

	const baseUrl = '/doc/v1'
	const pages = [
		{
			url: '/start',
			title: 'Get started'
		},
		{
			url: '/install',
			title: 'Installation'
		},
		{
			url: '/configuration',
			title: 'Configuration'
		},
	]
</script>

<Header />
<div class="flex">
	<Menu>
		{#each pages as {url, title}}
			<MenuItem href={baseUrl + url}>{title}</MenuItem>
		{/each}
	</Menu>
	<main class="p-4">
		<slot />
	</main>
</div>