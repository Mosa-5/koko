import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { signLanguages } from "../catalog/dummyData";
import { handArray } from "@/DummyDataHands";
import { Button } from "@/components/ui/button";
import { useScore, calcOtpScore } from "@/hooks/useScore";

const ExerciseFivePage = () => {
    const { lang, id } = useParams();

    const exercise = signLanguages
        .find(item => item.name === lang)
        ?.exercises.find(item => item.id === Number(id));

    const displayLevel = (signLanguages.find(l => l.name === lang)?.exercises.filter(e => e.category === exercise?.category) ?? []).findIndex(e => e.id === exercise?.id) + 1;

    const [sentence, setSentence] = useState("");
    const [inputs, setInputs] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [gaveUp, setGaveUp] = useState(false);
    const [earnedPoints, setEarnedPoints] = useState<number | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const scoredRef = useRef(false);

    const { addScore } = useScore(lang ?? "");

    const letters = sentence.replace(/ /g, "").split("");
    const words = sentence.split(" ");

    function getRandomSentence() {
        const list = exercise?.word || [];
        return list[Math.floor(Math.random() * list.length)].toUpperCase();
    }

    useEffect(() => {
        if (!exercise) return;
        initSentence();
    }, [exercise]);

    useEffect(() => {
        if (inputs.length > 0 && inputs.every((val, i) => val === letters[i])) {
            setCompleted(true);
        }
    }, [inputs]);

    useEffect(() => {
        if (completed && !scoredRef.current) {
            scoredRef.current = true;
            const pts = calcOtpScore(hintsUsed, gaveUp);
            if (pts > 0) {
                addScore(pts);
                setEarnedPoints(pts);
            }
        }
    }, [completed]);

    function initSentence() {
        const s = getRandomSentence();
        const flat = s.replace(/ /g, "");
        setSentence(s);
        setInputs(new Array(flat.length).fill(""));
        setCompleted(false);
        setHintsUsed(0);
        setGaveUp(false);
        setEarnedPoints(null);
        scoredRef.current = false;
        inputRefs.current = [];
        setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }

    const handleInput = (flatIndex: number, value: string) => {
        const char = value.slice(-1).toUpperCase();
        const newInputs = [...inputs];
        newInputs[flatIndex] = char;
        setInputs(newInputs);
        if (char && flatIndex < letters.length - 1) {
            inputRefs.current[flatIndex + 1]?.focus();
        }
    };

    const handleKeyDown = (flatIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (inputs[flatIndex]) {
                const newInputs = [...inputs];
                newInputs[flatIndex] = "";
                setInputs(newInputs);
            } else if (flatIndex > 0) {
                inputRefs.current[flatIndex - 1]?.focus();
                const newInputs = [...inputs];
                newInputs[flatIndex - 1] = "";
                setInputs(newInputs);
            }
            e.preventDefault();
        }
    };

    const letterStatus = (flatIndex: number) => {
        if (!inputs[flatIndex]) return "empty";
        return inputs[flatIndex] === letters[flatIndex] ? "correct" : "incorrect";
    };

    const handleHintChar = () => {
        const nextIndex = inputs.findIndex((val, i) => val !== letters[i]);
        if (nextIndex === -1) return;
        const newInputs = [...inputs];
        newInputs[nextIndex] = letters[nextIndex];
        setInputs(newInputs);
        setHintsUsed(h => h + 1);
    };

    const handleGiveUp = () => {
        setGaveUp(true);
        setInputs([...letters]);
    };

    const correctCount = inputs.filter((val, i) => val === letters[i]).length;
    const progress = letters.length > 0 ? Math.round((correctCount / letters.length) * 100) : 0;

    let cursor = 0;
    const groups = words.map(w => {
        const group = w.split("").map(letter => ({ letter, flatIndex: cursor++ }));
        return group;
    });

    return (
        <div className="max-w-7xl mx-auto h-full flex flex-col items-center justify-center gap-7 px-4 md:px-8 py-4">
            <h1 className="text-3xl font-bold">{exercise?.category} — Level {displayLevel}</h1>

            <div className="w-full max-w-md flex flex-col gap-2">
                <div className="flex justify-between text-sm font-semibold">
                    {completed ? (
                        <>
                            <span className="text-green-600">Completed! 🎉</span>
                            <span style={{ color: gaveUp ? undefined : "var(--color-main-color)" }} className={gaveUp ? "text-gray-400" : ""}>
                                {gaveUp ? "No points awarded" : earnedPoints !== null ? `+${earnedPoints} pts` : ""}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="text-gray-600">Progress</span>
                            <span className="text-gray-600">{correctCount} / {letters.length} &nbsp;·&nbsp; {progress}%</span>
                        </>
                    )}
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden border border-black">
                    <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${completed ? 100 : progress}%`, backgroundColor: completed ? "#16a34a" : "var(--color-main-color)" }}
                    />
                </div>
            </div>

            <div className="flex flex-col items-center gap-1">
                <p className="text-lg font-semibold text-center">Each image is a hand sign for one letter.</p>
                <p className="text-sm text-gray-500">{words.length} word{words.length !== 1 ? "s" : ""}, {letters.length} letters total — the <span className="font-bold text-black">+</span> separates words</p>
            </div>

            <div className="flex gap-5 flex-wrap justify-center items-end">
                {groups.map((group, gi) => (
                    <div key={gi} className="flex gap-5 items-end flex-wrap justify-center">
                        {gi > 0 && (
                            <div className="flex flex-col items-center gap-2 pb-1">
                                <div className="w-10 h-24 md:h-28 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-gray-400">+</span>
                                </div>
                                <div className="w-10 h-14 md:h-16 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-gray-300">+</span>
                                </div>
                            </div>
                        )}
                        {group.map(({ letter, flatIndex }) => {
                            const sign = handArray.find(obj => obj.letter === letter);
                            const status = letterStatus(flatIndex);
                            return (
                                <div key={flatIndex} className="flex flex-col items-center gap-3">
                                    <div className="border-2 border-black rounded-lg p-1 w-20 h-24 md:w-24 md:h-28 flex items-center justify-center bg-white">
                                        {sign
                                            ? <img src={sign.image} alt={`sign for letter ${flatIndex + 1}`} className="w-full h-full object-contain" />
                                            : <span className="text-gray-300 text-xl">?</span>
                                        }
                                    </div>
                                    <input
                                        ref={el => { inputRefs.current[flatIndex] = el; }}
                                        type="text"
                                        value={inputs[flatIndex] ?? ""}
                                        onChange={e => handleInput(flatIndex, e.target.value)}
                                        onKeyDown={e => handleKeyDown(flatIndex, e)}
                                        disabled={completed}
                                        className={`w-14 h-14 md:w-16 md:h-16 text-center text-2xl font-bold border-2 rounded-lg outline-none transition-colors
                                            ${status === "correct" ? "border-green-500 text-green-600 bg-green-50" :
                                              status === "incorrect" ? "border-red-400 text-red-600 bg-red-50" :
                                              "border-black focus:border-[var(--color-main-color)]"}`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
                <Button onClick={handleHintChar} className={`min-w-36 ${completed ? "invisible" : ""}`}>Hint {hintsUsed > 0 && `(${hintsUsed})`}</Button>
                <Button onClick={handleGiveUp} className={`min-w-36 bg-red-500 hover:bg-red-400 text-white ${completed ? "invisible" : ""}`}>Give Up</Button>
                <Button onClick={initSentence} className="min-w-36">New Sentence</Button>
            </div>
        </div>
    );
};

export default ExerciseFivePage;
