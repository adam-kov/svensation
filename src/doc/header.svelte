<script>
	import { Github, FileText } from 'lucide-svelte'
</script>

<header class="flex items-center justify-between px-2 lg:px-4 py-2 text-3xl bg-slate-200">
	<a href="/" class="px-2 lg:px-4 pb-1 rounded-lg duration-200 hover:bg-slate-300">Svensation</a>
	<div class="flex">
		<a href="/docs"
		class="rounded-full p-2 mr-2 duration-200 hover:bg-slate-300">
			<FileText size={28} />
		</a>
		<a href="https://github.com/n00pper/svensation"
		rel="noreferrer" class="rounded-full p-2 duration-200 hover:bg-slate-300">
			<Github size={28} />
		</a>
	</div>
</header>