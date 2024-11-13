<script lang="ts">
	let {
		size,
		background,
		link,
		titleBg,
		title,
		titleColor,
		description,
		iconColor,
		children,
		border,
		borderColor,
		textColor = null
	} = $props<{
		size: 'sm' | 'md' | 'lg';
		background: string;
		link: string;
		titleBg: string;
		title: string;
		titleColor: string;
		description: string;
		iconColor: string;
		children: any;
		border: boolean;
		borderColor: string;
		textColor: string | null;
	}>();
</script>

<div
	class="{background} relative h-24 w-full rounded-lg bg-left {border
		? `border ${borderColor}`
		: ''} overflow-hidden"
>
	<div class="flex h-full w-full items-center justify-between px-3">
		<div class="flex flex-col items-center gap-1 text-left">
			<a
				href={link}
				class="{titleBg} cursor-pointer select-none rounded-2xl px-3 py-1 text-left text-sm transition-colors {titleColor}"
				>{title}</a
			>
			<p class="select-none text-left text-sm {textColor !== null ? textColor : 'text-white'}">
				{description}
			</p>
		</div>
		<div class="absolute right-1 h-28 w-28 rounded-lg {iconColor}">
			{@render children()}
		</div>
	</div>
</div>
