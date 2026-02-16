import {useState} from "react";
import {useLanguage} from "@/context/LanguageContext";
import Image from "next/image";
import {Language, TypeLanguage} from "@/types/language";
import {allLanguages} from "@/lib/db";

interface LanguageSelectionProps {
    type: TypeLanguage;
}

export default function LanguageSelection({type}: LanguageSelectionProps) {
    const { getLanguage, setLanguageAndSave } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)

    const handleLanguageChange = (lang: Language) => {
        if (lang === getLanguage(type)) {
            return;
        }
        setLanguageAndSave({language: lang, type});
        handleOpen();
    }

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={"mr-6 flex items-center relative h-full"}>
            <div
                className={`
                    absolute transition-all duration-300 ease-in-out
                    bg-red-900 flex items-center gap-2 z-99
                    
                    max-sm:-bottom-full max-sm:h-auto max-sm:flex-col
                    max-sm:px-1 max-sm:pb-2 max-sm:pt-6 max-sm:rounded-b-full
                    
                    md:left-[-200%] md:h-[55%] md:mr-2 
                    md:pl-2 md:pr-6 md:rounded-l-full
                     
                    ${isOpen
                    ? 'opacity-100 md:translate-x-0 max-sm:translate-y-0'
                    : 'opacity-0 md:translate-x-4 max-sm:-translate-y-4 pointer-events-none'}
                `}
            >
                {allLanguages.filter((lang: Language) => lang !== getLanguage(type)).map((lang: Language, index: number) => (
                    <Image
                        key={index}
                        src={`/flags/flag-${lang}.png`}
                        alt={lang}
                        width={100}
                        height={100}
                        className={"h-7 w-auto"}
                        onClick={() => handleLanguageChange(lang)}
                    />
                ))}
            </div>
            <Image
                src={`/flags/flag-${getLanguage(type)}.png`}
                alt={getLanguage(type)}
                width={100}
                height={100}
                className={"h-3/5 w-auto z-100 aspect-square"}
                onClick={handleOpen}
            />
        </div>

    )
}