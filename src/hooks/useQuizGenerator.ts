'use client'

import {useCallback, useState} from "react";
import {QuizQuestion} from "@/types/quiz";
import {words} from "@/lib/db";
import {Room} from "@/types/words_objects";

interface QuizGeneratorProps {
    room: Room;
}

export function useQuizGenerator({
    room
}: QuizGeneratorProps)
{
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [isReady, setIsReady] = useState(false);

    const generateQuiz = useCallback(() => {

        const shuffledWords = [...words]
            .filter((word) => word.room === room)
            .sort(() => 0.5 - Math.random());

        const newQuestions: QuizQuestion[] = shuffledWords.map((target): QuizQuestion => {
            const distractors = words
                .filter(w => w.id !== target.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            // 4. Формируем пул вариантов и перемешиваем их
            const options = [target, ...distractors].sort(() => 0.5 - Math.random());

            return {
                id: target.id,
                targetWord: target,
                options,
            }
        })

        setQuestions(newQuestions);
        setIsReady(true);
    }, [room]);

    return {
        questions,
        isReady,
        generateQuiz
    }
}