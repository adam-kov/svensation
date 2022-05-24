<script context="module" lang="ts">
	import type { LoadOutput } from '@sveltejs/kit'

	export const load = async (): Promise<LoadOutput> => ({ redirect: '/docs/v1/install', status: 302 })
</script>