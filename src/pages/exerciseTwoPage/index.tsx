import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { videoArray } from "@/DummyDataVideos";
import { signLanguages } from "../catalog/dummyData";
import { Button } from "@/components/ui/button";
import { useScore, calcOtpScore } from "@/hooks/useScore";

const ExercisePage = () => {
    const { lang, id } = useParams();

    const exercise = signLanguages
        .find((item) => item.name === lang)
        ?.exercises.find((item) => item.id === Number(id));

    const displayLevel = (signLanguages.find(l => l.name === lang)?.exercises.filter(e => e.category === exercise?.category) ?? []).findIndex(e => e.id === exercise?.id) + 1;

    const [videoName, setVideoName] = useState(() => getRandomVideo());
    const [inputs, setInputs] = useState<string[]>([]);
    const [completed, setCompleted] = useState(false);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [gaveUp, setGaveUp] = useState(false);
    const [earnedPoints, setEarnedPoints] = useState<number | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const scoredRef = useRef(false);

    const { addScore } = useScore(lang ?? "");

    const word = videoName.toUpperCase();

    useEffect(() => {
        setInputs(new Array(word.length).fill(""));
        inputRefs.current = [];
        setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }, [videoName]);

    useEffect(() => {
        if (inputs.length > 0 && inputs.every((val, i) => val === word[i])) {
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

    function getRandomVideo(): string {
        return videoArray.length > 0
            ? videoArray[Math.floor(Math.random() * videoArray.length)].name || ""
            : "";
    }

    const handleNewVideo = () => {
        setCompleted(false);
        setHintsUsed(0);
        setGaveUp(false);
        setEarnedPoints(null);
        scoredRef.current = false;
        setVideoName(getRandomVideo());
    };

    const handleInput = (index: number, value: string) => {
        const char = value.slice(-1).toUpperCase();
        const newInputs = [...inputs];
        newInputs[index] = char;
        setInputs(newInputs);
        if (char && index < word.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (inputs[index]) {
                const newInputs = [...inputs];
                newInputs[index] = "";
                setInputs(newInputs);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
                const newInputs = [...inputs];
                newInputs[index - 1] = "";
                setInputs(newInputs);
            }
            e.preventDefault();
        }
    };

    const letterStatus = (index: number) => {
        if (!inputs[index]) return "empty";
        return inputs[index] === word[index] ? "correct" : "incorrect";
    };

    const handleHintChar = () => {
        const nextIndex = inputs.findIndex((val, i) => val !== word[i]);
        if (nextIndex === -1) return;
        const newInputs = [...inputs];
        newInputs[nextIndex] = word[nextIndex];
        setInputs(newInputs);
        setHintsUsed(h => h + 1);
    };

    const handleGiveUp = () => {
        setGaveUp(true);
        setInputs(word.split(""));
    };

    return (
        <div className="max-w-4xl mx-auto h-full flex flex-col items-center gap-6 px-4 md:px-8 pt-6 pb-4">
            <h1 className="text-2xl font-semibold">{exercise?.category} — Level {displayLevel}</h1>

            <div className="w-full max-w-3xl flex justify-center">
                {videoArray
                    .filter(obj => obj.name === videoName)
                    .map(obj => (
                        <video
                            key={obj.name}
                            muted
                            controls
                            className="border-2 border-black bg-black rounded-lg"
                            style={{ maxWidth: "100%", maxHeight: "50vh" }}
                        >
                            <source src={obj.video} type="video/mp4"/>
                        </video>
                    ))}
            </div>

            <p className="text-xl font-semibold text-center">
                {completed
                    ? <span className="text-green-600">Completed! 🎉{earnedPoints !== null && !gaveUp ? <span className="ml-3" style={{ color: "var(--color-main-color)" }}>+{earnedPoints} pts</span> : gaveUp ? <span className="ml-3 text-gray-400 text-base font-normal">No points awarded</span> : null}</span>
                    : "Type the word signed in the video"
                }
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
                {word.split("").map((_, i) => {
                    const status = letterStatus(i);
                    return (
                        <input
                            key={i}
                            ref={el => { inputRefs.current[i] = el; }}
                            type="text"
                            value={inputs[i] ?? ""}
                            onChange={e => handleInput(i, e.target.value)}
                            onKeyDown={e => handleKeyDown(i, e)}
                            disabled={completed}
                            className={`w-12 h-12 md:w-14 md:h-14 text-center text-xl font-bold border-2 rounded-lg outline-none transition-colors
                                ${status === "correct"   ? "border-green-500 text-green-600 bg-green-50" :
                                  status === "incorrect" ? "border-red-400 text-red-600 bg-red-50" :
                                  "border-black focus:border-[var(--color-main-color)]"}`}
                        />
                    );
                })}
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
                <Button onClick={handleHintChar} className={`min-w-36 ${completed ? "invisible" : ""}`}>Hint {hintsUsed > 0 && `(${hintsUsed})`}</Button>
                <Button onClick={handleGiveUp} className={`min-w-36 bg-red-500 hover:bg-red-400 text-white ${completed ? "invisible" : ""}`}>Give Up</Button>
                <Button onClick={handleNewVideo} className="min-w-36">New Word</Button>
            </div>
        </div>
    );
};

export default ExercisePage;
