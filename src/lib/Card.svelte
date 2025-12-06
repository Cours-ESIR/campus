<script lang="ts">
	let { title }: { title: string } = $props();
</script>

<div class="flex flex-col rounded-2xl p-4 bg-slate-100 dark:bg-slate-900">
	<h3>
		{title}
	</h3>
	<div class="flex items-center gap-2 opacity-70 font-extralight">
		<slot></slot>
	</div>
</div>
