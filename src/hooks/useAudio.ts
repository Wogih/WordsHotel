'use client';

import { useEffect, useRef, useCallback, useState } from "react";

export const useAudio = (src: string) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }

        const audio = new Audio(src);
        audioRef.current = audio;

        // --- Отслеживание событий ---
        const onPlay = () => setIsPlaying(true);
        const onEnded = () => setIsPlaying(false);

        const onError = (e: Event) => {
            console.error(`Ошибка загрузки аудио: ${src}`, e);
            setError("Не удалось загрузить аудио");
            setIsPlaying(false);
        };

        // Навешиваем слушатели
        audio.addEventListener("play", onPlay);
        audio.addEventListener("ended", onEnded);
        audio.addEventListener("error", onError);

        // Очистка
        return () => {
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("ended", onEnded);
            audio.removeEventListener("error", onError);

            audio.pause();
            audio.src = "";
            audioRef.current = null;
            setIsPlaying(false);
            setError(null);
        };
    }, [src]);

    const play = useCallback(async () => {
        if (!audioRef.current) throw new Error("Audio not initialized");

        try {
            await audioRef.current.play();
        } catch (err) {
            console.warn("Play error:", err);
            throw err;
        }
    }, []);


    return { play, isPlaying, error };
};