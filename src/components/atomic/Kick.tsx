import { SiKick } from "@icons-pack/react-simple-icons"

export const Kick = () => {
    return (
        <div className="group flex overflow-x-clip items-center relative p-4 bg-gradient-to-r from-[#53FC19]/70 to-neutral-900/70 border-2 border-neutral-700 rounded-md w-full">
            <div className="flex flex-col gap-1 items-start">
                <p className="text-white pl-2">kick/</p>
                <a href="https://kick.com/irukaga" className="px-2 py-1 text-sm bg-white hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.3)] rounded-full text-black transition-shadow">@onursedef</a>
            </div>
            <SiKick className="text-white size-20 absolute -right-3 z-10" />
            <SiKick className="text-white size-20 absolute -right-3 z-0 opacity-0 group-hover:blur-md group-hover:opacity-30 transition-all" />
        </div>
    )
}