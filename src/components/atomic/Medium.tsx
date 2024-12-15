import { SiMedium } from "@icons-pack/react-simple-icons"

export const Medium = () => {
    return (
        <div className="group flex items-center overflow-x-clip relative p-4 bg-neutral-900/70 border-2 border-neutral-700 rounded-md w-full">
            <div className="flex flex-col gap-1 items-start">
                <p className="text-white pl-2">medium/</p>
                <a href="https://medium.com/@onursedef" className="px-2 py-1 text-sm bg-white hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.3)] rounded-full text-black transition-shadow">@onursedef</a>
            </div>
            <SiMedium className="fill-white size-20 absolute -right-3 z-10" />
            <SiMedium className="fill-white size-20 absolute -right-3 z-0 opacity-0 group-hover:blur-md group-hover:opacity-30 transition-all" />
        </div>
    )
}