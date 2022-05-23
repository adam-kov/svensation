<script context="module" lang="ts">
	import type { LoadOutput } from '@sveltejs/kit'

	export const load = async (): Promise<LoadOutput> => ({ redirect: '/doc/v1', status: 302 })
</script>