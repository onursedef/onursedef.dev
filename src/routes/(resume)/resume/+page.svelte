<script lang="ts">
	import { page } from '$app/stores';
	import EducationCard from '$lib/components/atomic/EducationCard.svelte';
	import ExperienceCard from '$lib/components/atomic/ExperienceCard.svelte';
	import ResumeProjectCard from '$lib/components/atomic/ResumeProjectCard.svelte';
	import Logo from '$lib/components/icons/Logo.svelte';
	import Icon from '@iconify/svelte';

    const { data } = $page;

    data.resume.experiences = data.resume.experiences.reverse();

    function formatPhoneNumber(phone: string) {
        // Extract the country code, area code, and the rest of the number
        const match = phone.match(/^\+(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (!match) {
            throw new Error('Invalid phone number format');
        }

        // Format the phone number according to the desired pattern
        const [, countryCode, areaCode, part1, part2, part3] = match;
        return `+${countryCode} (${areaCode}) ${part1} ${part2} ${part3}`;
    }


    function getLevel(level: string) {
        if (level === "native") {
            return "Native";
        }

        return `Level ${level.toUpperCase()}`;
    }
</script>

<div class="flex w-full h-full justify-center md:my-14">
    <div class="flex flex-col gap-4 max-auto md:w-[21cm] md:h-fit w-full h-fit bg-neutral-800 px-8 py-8 place-items-start md:rounded-lg font-inter">
        <div class="flex w-full items-start justify-between flex-col md:flex-row md:gap-0 gap-2">
            <div class="flex items-center gap-3">
                <a href="/">
                    <Logo class="size-14 text-indigo-400" />
                </a>
                <p class="font-semibold text-3xl whitespace-nowrap">
                    {data.resume.full_name}
                </p>
            </div>
            <a href="https://directus.onursedef.dev/assets/{data.resume.downloadable_cv}/Onur Sedef Resume.pdf?download"  download="Onur Sedef Resume.pdf" class="group inline-flex items-center gap-2 px-4 py-3 bg-neutral-900 rounded-md hover:bg-neutral-900/50 transition-colors">
                <Icon icon="solar:download-broken" width="24" height="24" class="size-5 text-neutral-400 group-hover:text-white transition-colors" />
                <p class="text-neutral-400 group-hover:text-white transition-colors text-sm">Download CV</p>
            </a>
        </div>
        <div class="flex flex-col md:flex-row w-full items-start justify-between gap-4 md:gap-10">
            <div class="flex flex-col w-full items-start gap-1">
                <p class="hover:text-violet-400 w-fit whitespace-nowrap">
                    {data.resume.location}
                </p>
                <p class="hover:text-violet-400 w-fit">
                    <a href="mailto:{data.resume.mail}">{data.resume.mail}</a>
                </p>
                <p class="hover:text-violet-400 w-fit">
                    <a href="{data.resume.github_url}">@{data.resume.github_url.split("https://github.com/")[1]}</a>
                </p>
                <p class="hover:text-violet-400 w-fit">
                    <a href="{data.resume.portfolio_url}">{data.resume.portfolio_url.split("https://")[1]}</a>
                </p>
                <p class="hover:text-violet-400 w-fit">
                    <a href="tel:{data.resume.phone_number}">{formatPhoneNumber(data.resume.phone_number)}</a>
                </p>
            </div>
            <div>
                <p>{data.resume.summary}</p>
            </div>
        </div>
        <div class="w-full mt-4">
            <p class="tracking-widest uppercase fontsemibold text-neutral-400 text-sm">
                Experiences
            </p>
        </div>
        {#each data.resume.experiences as experience}
            <ExperienceCard experience={experience} />
        {/each}
        <div class="w-full mt-4">
            <p class="tracking-widest uppercase fontsemibold text-neutral-400 text-sm">
                Projects
            </p>
        </div>
        {#each data.resume.projects as project}
            <ResumeProjectCard project={project} />
        {/each}
        <div class="w-full mt-4">
            <p class="tracking-widest uppercase fontsemibold text-neutral-400 text-sm">
                Education
            </p>
        </div>
        {#each data.resume.educations as education}
            <EducationCard education={education} />
        {/each}
        <div class="w-full mt-4">
            <p class="tracking-widest uppercase fontsemibold text-neutral-400 text-sm">
                Languages
            </p>
        </div>
        <div class="flex flex-col gap-2">
            {#each data.resume.languages as language}
                <p>• <span class="font-semibold">{language.name}</span>: {getLevel(language.level)}</p>
            {/each}
        </div>
        <div class="w-full mt-4">
            <p class="tracking-widest uppercase fontsemibold text-neutral-400 text-sm">
                Certificates
            </p>
        </div>
        <div class="flex flex-col gap-2">
            {#each data.resume.certificates as certificate}
                <a href="{certificate.url}" class="hover:text-indigo-400">
                    • {certificate.name}
                </a>
            {/each}
        </div>
        <div class="w-full mt-4">
            <p class="tracking-widest uppercase fontsemibold text-neutral-400 text-sm">
                Skills
            </p>
        </div>
        {#each data.resume.skils as skill}
            <div class="flex flex-col gap-2">
                <p class="font-semibold text-xs uppercase text-neutral-500 tracking-widest">{skill.name}</p>
                <p>{skill.data.join(" • ")}</p>
            </div>
        {/each}
    </div>
</div>