<script lang="ts">

	let ids = [
		'first',
		'second',
		'third',
		'fourth'
	]
</script>

<h1>App-like page transitions in the browser with Svelte</h1>
{#each ids as id}
	<div sn-transition={id + '-background'} class="bg">
		<a href={'/' + id} class="row">
			<img src="https://via.placeholder.com/100" alt="placeholder"
			sn-transition={id}>
			<h2 sn-transition={id + '-title'}>{id}</h2>
		</a>
	</div>
{/each}

<style>
	.bg {
		background-color: #e9e9e9;
	}

	.row {
		display: flex;
		align-items: center;
		padding: 1rem;
		margin: 1rem 0;
	}

	.row img {
		margin-right: 1rem;
	}
</style>