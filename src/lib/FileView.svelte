<script lang="ts">
	import md from "markdown-it";
	import hljs from "highlight.js";
	import mdhljs from "markdown-it-highlightjs";
	import mk from "@vscode/markdown-it-katex";

	const markdownit = md({
		html: true,
	})
		.use(mdhljs, {
			auto: true,
			ignoreIllegals: true,
			code: true,
			inline: false,
			hljs,
		})
		.use(mk.default, {
			displayMode: true,
			throwOnError: true,
			macros: {
				"\\(": "\\lparen",
				"\\)": "\\rparen",
				"\\{": "\\lbrace",
				"\\}": "\\rbrace",
				"\\[": "\\lbrack",
				"\\]": "\\rbrack",
				"\\n": "\\\\ \\ \\\\",
				"\\vec": "\\overrightarrow{#1}",
				"\\embrace": "\\left#2\\begin{split} #1 \\end{split}\\right#3",
				"\\aembrace": "\\embrace{#1}{\\{}{\\}}",
				"\\pembrace": "\\embrace{#1}{\\(}{\\)}",
				"\\cembrace": "\\embrace{#1}{\\[}{\\]}",
				"\\abs": "\\displaystyle\\left\\lvert{#1}\\right\\rvert",
			},
		})
		.use(function underline(md) {
			function renderEm(
				tokens: any,
				idx: any,
				opts: any,
				_: any,
				slf: any,
			) {
				let token = tokens[idx];
				if (token.markup === "_") token.tag = "u";
				return slf.renderToken(tokens, idx, opts);
			}

			md.renderer.rules.em_open = renderEm;
			md.renderer.rules.em_close = renderEm;
		});

	let { buffer } = $props();

	const content = markdownit.render(buffer.toString());
</script>

<div id="cours" class="flex flex-col gap-4">
	{@html content}
</div>

<style>
	@reference "../app.css";

	#cours :global(.hljs .hljs-keyword) {
		@apply text-red-500;
	}

	#cours :global(.hljs .hljs-title) {
		@apply text-yellow-500;
	}

	#cours :global(.hljs .hljs-operator),
	#cours :global(.hljs .hljs-comment) {
		@apply text-gray-500;
	}

	#cours :global(.hljs .hljs-number) {
		@apply text-purple-500;
	}

	#cours :global(.hljs .hljs-built_in) {
		@apply text-blue-500;
	}

	#cours :global(.hljs .hljs-string) {
		@apply text-green-500;
	}

	#cours :global(.hljs *),
	#cours :global(.hljs) {
		@apply font-mono text-sm;
	}

	#cours :global(h1) {
		@apply text-red-500 text-5xl;
	}

	#cours :global(h2) {
		@apply text-green-500 text-4xl;
	}

	#cours :global(h3) {
		@apply text-blue-500 text-3xl;
	}

	#cours :global(h4) {
		@apply text-purple-500 text-2xl;
	}

	#cours :global(h5) {
		@apply text-orange-500 text-xl;
	}

	#cours :global(h6) {
		@apply text-sky-500 text-lg;
	}

	#cours :global(blockquote) {
		@apply border-l-8 border-yellow-500 rounded-r-2xl text-yellow-500 bg-yellow-100 p-4;
	}

	#cours :global(pre) {
		@apply bg-slate-100 dark:bg-slate-900 overflow-auto rounded-2xl p-2;
	}
</style>
