import {useEffect, useRef} from "react";

export const useAudio = (src: string) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(src);
        }
    }, [src]);

    const play = () => audioRef.current?.play();

    return { play };
};