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

<div class="font-semibold text-xl md:col-span-12 col-span-1 dark:hover:text-violet-400 hover:text-violet-700 w-fit">
    <p>
        {education.title}
    </p>
</div>
<p class="md:col-span-4 col-span-1">
    {formattedStartDate} - {formattedEndDate ?? 'Current'}
</p>
<p class="md:col-span-8 col-span-1 -mt-2">
    {getDegree(education.degree)} in {education.field_name}
</p>