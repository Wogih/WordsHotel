'use client';

import { useAudio } from "@/hooks/useAudio";
import { Translations } from "@/lib/db";
import { Language } from "@/types/language";
import React from "react";

interface AudioButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    word: {
        name: string;
    };
    currentLearnLanguage: Language;
    currentMainLanguage: Language;
}

export function AudioButton({
    word,
    currentLearnLanguage,
    currentMainLanguage,
    className,
    ...props
}: AudioButtonProps) {

    const audioSrc = `/voices/${currentLearnLanguage}/${word.name}.mp3`;
    const { play, isPlaying, error } = useAudio(audioSrc);

    const handlePlay = async () => {
        try {
            await play();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button
            onClick={handlePlay}
            disabled={isPlaying || !!error}
            className={`
                w-full mb-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2
                ${error ? 'bg-red-500 ' : 'bg-(--main-color) '}
                ${isPlaying ? 'scale-98 bg-(--main-color)' : ''}
                text-white ${className}
            `}
            {...props}
        >
            {isPlaying ? "🔊" : "🔈"}

            <span>
                {error
                    ? Translations({ key: 'error', language: currentMainLanguage })
                    : Translations({ key: 'words.listen', language: currentMainLanguage })
                }
            </span>
        </button>
    );
}