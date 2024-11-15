<script lang="ts">
	import DangerButton from "./danger-button.svelte";
	import InfoButton from "./info-button.svelte";
	import PrimaryButton from "./primary-button.svelte";
	import SecondaryButton from "./secondary-button.svelte";
import SuccessButton from "./success-button.svelte";
	import WarningButton from "./warning-button.svelte";

    let {
        onclick,
        type,
        disabled,
        loading,
        children,
    } = $props<{
        onclick: () => void;
        type: 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary';
        disabled: boolean;
        loading: boolean;
        children: any;
    }>();
</script>

{#if type === 'success'}
    <SuccessButton {onclick} {disabled} {loading}>{children}</SuccessButton>
{:else if type === 'danger'}
    <DangerButton {onclick} {disabled} {loading}>{children}</DangerButton>
{:else if type === 'warning'}
    <WarningButton {onclick} {disabled} {loading}>{children}</WarningButton>
{:else if type === 'info'}
    <InfoButton {onclick} {disabled} {loading}>{children}</InfoButton>
{:else if type === 'secondary'}
    <SecondaryButton {onclick} {disabled} {loading}>{children}</SecondaryButton>
{:else}
    <PrimaryButton {onclick} {disabled} {loading}>{children}</PrimaryButton>
{/if}