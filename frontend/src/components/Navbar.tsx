import { SparklesIcon } from "@heroicons/react/24/outline";

function Navbar() {
  return (
    <div className="bg-sky-500 text-white py-5">
        <div className="sm:container mx-auto flex items-center justify-between">
            <h1 className="text-3xl font-bold">
                <a href="/">AutoShare</a>
            </h1>

            <div>
                <button type="button" className="flex items-center gap-1 text-sky-500 bg-white box-border border border-transparent shadow-xs font-bold leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none hover:cursor-pointer">
                    <SparklesIcon className="size-5"/>
                    <span>Ask AutoShare</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar