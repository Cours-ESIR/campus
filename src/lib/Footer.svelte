<script lang="ts">
	import { Gear, House, Info, MapPin } from "@steeze-ui/phosphor-icons";
	import { Github } from "@steeze-ui/simple-icons";
	import { Icon } from "@steeze-ui/svelte-icon";
</script>

<footer
	class="flex items-center justify-center bg-slate-50 dark:bg-slate-950 w-full overflow-hidden gap-2 shadow-2xl"
>
	<a class="rounded-full p-2 hover:bg-blue-500 duration-200 m-2 text-center" href="/">
		<Icon src={House} theme="fill" class="size-6"></Icon>
	</a>
	<a class="rounded-full p-2 hover:bg-blue-500 duration-200 m-2 text-center" href="/map">
		<Icon src={MapPin} theme="fill" class="size-6"></Icon>
	</a>
	<a
		class="rounded-full p-2 hover:bg-blue-500 duration-200 m-2 text-center"
		href="/settings"
	>
		<Icon src={Info} theme="fill" class="size-6"></Icon>
	</a>
	<a
		class="rounded-full p-2 hover:bg-blue-500 duration-200 m-2 text-center"
		target="_blank"
		href="https://github.com/cours-esir/campus"
	>
		<Icon src={Github} theme="fill" class="size-6"></Icon>
	</a>
</footer>
