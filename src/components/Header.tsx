'use client'

import {usePathname, useRouter} from "next/navigation";
import LanguageSelection from "@/components/LanguageSelection";
import {useLanguage} from "@/context/LanguageContext";
import {Translations} from "@/lib/db";

export default function Header() {

    const pathname = usePathname();
    const router = useRouter();
    const {getLanguage} = useLanguage();

    const pages = [ "/", "/dictionary", "/testing"]

    return (
        <nav>
            <header className={"max-sm:hidden w-screen h-16 bg-(--main-color) text-gray-300 flex justify-between"}>
                <div className={"flex items-center gap-3"}>
                    {pages.map((page, index) => (
                        <button
                            key={index}
                            className={`ml-2 px-4 py-2 text-xl relative overflow-hidden group ${pathname === page ? "text-white" : ""}`}
                            onClick={() => {router.push(page)}}
                        >
                            <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-300 ${pathname === page ? "bg-white" : ""} transition-all duration-300 group-hover:w-full group-hover:left-0`} />
                            {Translations({key: `route.${page}`, language: getLanguage("main")})}
                        </button>
                    ))}
                </div>
                <div className={"flex items-center gap-16"}>
                    <LanguageSelection type={"main"} />
                    <LanguageSelection type={"learn"} />
                </div>
            </header>
            <header className={"sm:hidden w-screen h-16 bg-(--main-color) text-white flex items-center justify-between"}>
                <select
                    className={"ml-2 px-4 py-2 text-xl focus:outline-none select-none"}
                    onChange={(e) => {router.push(e.target.value)}}
                    value={pathname}
                >
                    {pages.map((page, index) => (
                        <option
                            key={index}
                            className={"bg-(--main-color)"}
                            value={page}
                        >
                            {Translations({key: `route.${page}`, language: getLanguage("main")})}
                        </option>
                    ))}
                </select>

                <div className={"flex items-center h-full"}>
                    <LanguageSelection type={"main"} />
                    <LanguageSelection type={"learn"} />
                </div>
            </header>
        </nav>
    )
}