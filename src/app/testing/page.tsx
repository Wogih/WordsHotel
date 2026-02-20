'use client'
import Header from "@/components/Header";
import { useQuizGenerator } from "@/hooks/useQuizGenerator";
import { useState } from "react";
import { Room } from "@/types/words_objects";
import Spinner from "@/components/common/loading/Spinner";
import { useLanguage } from "@/context/LanguageContext";
import ChoosingRoom from "@/components/common/choosingRoom";
import { useDebounce } from "@/hooks/useDebounce";
import { Translations } from "@/lib/db";
// Убедитесь, что путь к типам верный. Если UserAnswer нет в quiz.ts, раскомментируйте создание интерфейса ниже или добавьте его туда.
import { QuizQuestion, UserAnswer } from "@/types/quiz";
import ImageWithLoader from "@/components/common/loading/ImageWithLoader";
import { AudioButton } from "@/components/common/audioButton";

type QuizMode = "text" | "image" | "audio";

export default function Page() {
    const { getLanguage } = useLanguage();
    const currentMainLanguage = getLanguage("main");
    const currentLearnLanguage = getLanguage("learn");

    const [activeRoom, setActiveRoom] = useState<Room>("room");
    const selectedRoom = useDebounce(activeRoom, 300);

    // === Генератор тестов ===
    const { questions, isReady, generateQuiz } = useQuizGenerator({ room: selectedRoom });

    // === Тест ===
    const [activeMode, setActiveMode] = useState<QuizMode>("text");
    const [startTest, setStartTest] = useState<boolean>(false);

    // Состояния теста
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [, setUserAnswers] = useState<UserAnswer[]>([]);

    const quizModes: QuizMode[] = ["text", "image", "audio"];

    const handleStartTest = () => {
        setStartTest(true);
        setIsFinished(false);
        setScore(0);
        setCurrentIdx(0);
        setSelectedOption(null);
        setIsAnswerChecked(false);
        setUserAnswers([]);

        generateQuiz();
    };

    const nextQuestion = () => {
        if (currentIdx + 1 >= questions.length) {
            setIsFinished(true);
        } else {
            setCurrentIdx((prev) => prev + 1);
            setSelectedOption(null);
            setIsAnswerChecked(false);
        }
    };

    const switchRoom = (room: Room) => {
        setActiveRoom(room);
        setStartTest(false); // Сбрасываем тест при смене комнаты
        setIsFinished(false);
    };

    const handleOptionSelect = (optionId: number) => {
        if (isAnswerChecked) return;
        setSelectedOption(optionId);
    };

    const checkAnswer = () => {
        if (selectedOption === null || !questions[currentIdx]) return;

        const currentQuestion = questions[currentIdx];
        const isCorrect = currentQuestion.targetWord.id === selectedOption;

        if (isCorrect) {
            setScore((prev) => prev + 1);
        }

        const newAnswer: UserAnswer = {
            questionId: currentQuestion.id,
            selectedOptionId: selectedOption,
            isCorrect,
        };

        setUserAnswers((prev) => [...prev, newAnswer]);
        setIsAnswerChecked(true);
    };

    const renderQuestionContent = (question: QuizQuestion) => {
        const target = question.targetWord;

        // === Изображение режим ===
        if (activeMode === "image") {
            return (
                <div className="mb-6">
                    <ImageWithLoader
                        src={`/wordsImage/${target.image}.png`}
                        alt={target.name}
                        width={target.imageWidth || 300}
                        height={target.imageHeight || 300}
                        className="max-h-64 rounded-lg mx-auto object-contain"
                    />
                    <p className="text-center mt-2 text-black">
                        {Translations({ key: 'testing.choseRightWord', language: currentMainLanguage })}
                    </p>
                </div>
            );
        }

        // === Аудио режим ===
        if (activeMode === "audio") {
            return (
                <div className="mb-6 flex flex-col items-center">
                    <AudioButton
                        word={target}
                        currentLearnLanguage={currentLearnLanguage}
                        currentMainLanguage={currentMainLanguage}
                    />
                    <p className="text-center mt-2 text-black">
                        {Translations({ key: 'testing.listenAndChoseRightWord', language: currentMainLanguage })}
                    </p>
                </div>
            );
        }

        // === Текстовый режим ===
        return (
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-(--main-color)">
                    {Translations({ key: `words.${target.name}`, language: currentMainLanguage })}
                </h2>
            </div>
        );
    };

    // === Настройки теста ===
    if (!startTest) {
        return (
            <div className="overflow-hidden h-screen bg-(--bg-color)">
                <Header />
                <main className="flex flex-col gap-4 h-full justify-center items-center p-4">
                    <section className="flex flex-col gap-8 bg-(--second-color) rounded-lg px-4 py-6 w-full max-w-lg shadow-xl">
                        <h1 className="text-2xl font-bold text-center">
                            {Translations({ key: `testing.testSettings`, language: currentMainLanguage })}
                        </h1>
                        <div className="flex gap-4 justify-center">
                            <ChoosingRoom
                                currentMainLanguage={currentMainLanguage}
                                switchRoom={switchRoom}
                                activeRoom={activeRoom}
                            />
                        </div>
                        <div className="flex gap-4 justify-center flex-wrap">
                            {quizModes.map((mode) => {
                                const modeName = Translations({
                                    key: `mode.${mode}`,
                                    language: currentMainLanguage
                                });
                                return (
                                    <button
                                        key={mode}
                                        onClick={() => setActiveMode(mode)}
                                        className={`
                                            px-6 max-sm:px-4 py-3 max-sm:py-2 rounded-lg font-medium transition-all duration-200
                                            ${activeMode === mode
                                            ? 'bg-(--main-color) text-white scale-110'
                                            : 'bg-(--disabled-color) text-(--disabled-text) '
                                        }
                                        `}
                                    >
                                        {modeName}
                                    </button>
                                )
                            })}
                        </div>
                        <button
                            className="px-6 max-sm:px-4 py-3 max-sm:py-2 rounded-lg font-medium bg-(--main-color) text-white"
                            onClick={handleStartTest}
                        >
                            {Translations({ key: `testing.startTest`, language: currentMainLanguage })}
                        </button>
                    </section>
                </main>
            </div>
        );
    }

    // === Загрузка теста ===
    if (!isReady && startTest && !isFinished) {
        return (
            <div className="overflow-hidden h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex justify-center items-center">
                    <Spinner />
                </div>
            </div>
        );
    }

    // === Экран результата теста ===
    if (isFinished && questions.length > 0) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="overflow-hidden h-screen bg-(--bg-color)">
                <Header />
                <main className="flex flex-col items-center justify-center h-full p-4">
                    <div className="bg-(--second-color) p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-fade-in-up">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">{Translations({ key: 'testing.testCompleted', language: currentMainLanguage })}</h2>
                        <div className="text-6xl font-black text-(--main-color) mb-2">
                            {percentage}%
                        </div>
                        <p className="text-xl text-gray-600 mb-6">
                            {Translations({key: 'testing.youGet', language: currentMainLanguage})} {score} {Translations({key: 'from', language: currentMainLanguage})} {questions.length}
                        </p>

                        <div className="flex gap-4 justify-center flex-col sm:flex-row">
                            <button
                                onClick={handleStartTest}
                                className="px-6 py-3 bg-(--main-color) text-white rounded-lg font-medium "
                            >
                                {Translations({key: "testing.again", language: currentMainLanguage})}
                            </button>
                            <button
                                onClick={() => setStartTest(false)}
                                className="px-6 py-3 bg-(--disabled-color)/50 text-gray-800 rounded-lg font-medium"
                            >
                                {Translations({key: "testing.back", language: currentMainLanguage})}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // === Ошибка при генерации теста ===
    if (!questions || questions.length === 0) {
        return (
            <div className="overflow-hidden h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex justify-center items-center">
                    <p className="text-red-500">Недостаточно слов для теста в этой категории.</p>
                    <button onClick={() => setStartTest(false)} className="ml-4 underline">Назад</button>
                </div>
            </div>
        )
    }

    const currentQuestion = questions[currentIdx];

    // === Основной экран теста ===
    return (
        <div className="h-full overflow-x-hidden bg-(--bg-color) flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-2xl mx-auto w-full">
                {/* Прогресс бар */}
                <div className="w-full bg-(--second-color) rounded-full h-2.5 mb-6">
                    <div
                        className="bg-(--main-color) h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>

                {/* Номер вопроса */}
                <p className="text-sm text-gray-500 mb-4 self-start font-medium">
                    {Translations({key: 'testing.question', language: currentMainLanguage})} {currentIdx + 1} {Translations({key: 'from', language: currentMainLanguage})} {questions.length}
                </p>

                {/* Карточка вопроса */}
                <div className="w-full bg-(--second-color) p-6 rounded-xl shadow-lg mb-6 min-h-75 flex flex-col justify-center" >
                    {renderQuestionContent(currentQuestion)}

                    {/* Варианты ответов */}
                    <div className="grid grid-cols-1 gap-3 mt-4">
                        {currentQuestion.options.map((option) => {
                            const isSelected = selectedOption === option.id;
                            const isCorrectOption = option.id === currentQuestion.targetWord.id;

                            let buttonStyle = "bg-(--disabled-color)/50 bg-opacity-50 border-2 border-(--second-color)  text-gray-700 hover:border-(--main-color) ";

                            if (isAnswerChecked) {
                                if (isCorrectOption) {
                                    buttonStyle = "bg-green-100 border-2 border-green-500 text-green-800";
                                } else if (isSelected && !isCorrectOption) {
                                    buttonStyle = "bg-red-100 border-2 border-red-500 text-red-800";
                                } else {
                                    buttonStyle = "bg-gray-50 border-2 border-gray-200 opacity-50";
                                }
                            } else if (isSelected) {
                                buttonStyle = "bg-(--main-color) border-2 border-(--main-color) text-white shadow-md transform scale-[1.02]";
                            }

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionSelect(option.id)}
                                    disabled={isAnswerChecked}
                                    className={`p-4 rounded-lg font-medium transition-all duration-200 text-left flex items-center justify-between ${buttonStyle}`}
                                >
                                    <span>{Translations({ key: `words.${option.name}`, language: currentLearnLanguage })}</span>
                                    {isAnswerChecked && isCorrectOption && <span className="text-green-600 font-bold">✓</span>}
                                    {isAnswerChecked && isSelected && !isCorrectOption && <span className="text-red-600 font-bold">✕</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Кнопки управления */}
                <div className="w-full flex justify-end h-16">
                    {!isAnswerChecked ? (
                        <button
                            onClick={checkAnswer}
                            disabled={selectedOption === null}
                            className={`px-8 py-3 rounded-lg font-bold text-white transition-all shadow-md ${
                                selectedOption === null
                                    ? 'bg-(--disabled-color) text-(--disabled-text)'
                                    : 'bg-(--main-color)'
                            }`}
                        >
                            {Translations({key: 'testing.checkAnswer', language: currentMainLanguage})}
                        </button>
                    ) : (
                        <button
                            onClick={nextQuestion}
                            className="px-8 py-3 rounded-lg font-bold bg-(--main-color) text-white hover:opacity-90 shadow-lg active:scale-95 transition-all animate-pulse-once"
                        >
                            {currentIdx + 1 === questions.length ?
                                Translations({key: 'testing.finish', language: currentMainLanguage}) :
                                Translations({key: 'testing.next', language: currentMainLanguage})}
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}