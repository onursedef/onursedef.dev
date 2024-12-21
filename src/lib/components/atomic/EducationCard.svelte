<script lang="ts">
	import type { EducationCardProps } from "$lib/types/EducationCardProps";


    const { education } = $props<{ education: EducationCardProps }>();
    let degree = $state<string>("");

    const formattedStartDate = new Date(education.start_date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });

    const formattedEndDate = education.end_date ? new Date(education.end_date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    }) : null;
    
    function getDegree(degree: string) {
        switch (degree) {
            case 'associates_degree':
                return "Associate's Degree";
            case 'bachelors_degree':
                return "Bachelor's Degree";
            case 'masters_degree':
                return "Master's Degree";
            case 'doctorate_degree':
                return "Doctorate Degree";
        }
    }
</script>

<div class="flex flex-col w-full gap-2">
    <p class="font-semibold text-xl hover:text-indigo-400">{education.title}</p>
    <div class="flex justify-between max-w-xl">
        <p>{formattedStartDate} - {formattedEndDate ?? 'Current'}</p>
        <p>{getDegree(education.degree)} in {education.field_name}</p>
    </div>
</div>