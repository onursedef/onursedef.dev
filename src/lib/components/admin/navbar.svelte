<script lang="ts">
    import { Search, Bell } from "lucide-svelte";
    import Potrait from "../../../assets/images/potrait.jpg";
</script>

<div class="h-20 bg-slate-800 w-full flex items-center border-b-2 border-slate-600 shadow-lg">
    <div class="w-full max-w-4xl  mx-auto inline-flex justify-between items-center">
        <div class="inline-flex items-center gap-2 border-2 border-slate-600 px-2 rounded-md">
            <Search class="w-5 h-5 text-slate-400" />
            <input type="text" class="bg-transparent text-sm border-none focus:border-none focus:ring-0 focus:outline-none w-64" placeholder="Search...">
        </div>
        <div class="inline-flex items-center gap-4">
            <button class="relative">
                <div class="absolute -right-1 -top-2 inline-flex h-2 w-2 rounded-full bg-red-500 opacity-75 animate-ping"></div>
                <div class="absolute w-2 h-2 bg-red-500 rounded full -right-1 -top-2"></div>
                <Bell class="w-6 h-6 text-slate-400" />
            </button>
            <div>
                <img src={Potrait} alt="Potrait" class="w-10 h-10 rounded-md object-cover" />
            </div>
        </div>
    </div>
</div>