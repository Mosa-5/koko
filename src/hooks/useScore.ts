import { useCallback, useEffect, useState } from "react";

const KEY = "koko_scores";

interface Scores {
    total: number;
    byLang: Record<string, number>;
}

function load(): Scores {
    try {
        const raw = localStorage.getItem(KEY);
        if (raw) return JSON.parse(raw);
    } catch {}
    return { total: 0, byLang: {} };
}

function save(data: Scores) {
    localStorage.setItem(KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("koko-score-update", { detail: data }));
}

export function useScore(lang: string) {
    const [scores, setScores] = useState<Scores>(load);

    useEffect(() => {
        const handler = (e: Event) => setScores((e as CustomEvent<Scores>).detail);
        window.addEventListener("koko-score-update", handler);
        return () => window.removeEventListener("koko-score-update", handler);
    }, []);

    const addScore = useCallback((points: number): number => {
        if (points <= 0) return 0;
        setScores(prev => {
            const next: Scores = {
                total: prev.total + points,
                byLang: { ...prev.byLang, [lang]: (prev.byLang[lang] ?? 0) + points },
            };
            save(next);
            return next;
        });
        return points;
    }, [lang]);

    return {
        totalScore: scores.total,
        langScore: scores.byLang[lang] ?? 0,
        addScore,
    };
}

export function calcOtpScore(hintsUsed: number, gaveUp: boolean): number {
    if (gaveUp) return 0;
    return Math.max(10, 100 - hintsUsed * 15);
}
