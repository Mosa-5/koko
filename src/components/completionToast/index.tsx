interface CompletionToastProps {
    show: boolean;
    points: number | null;
    gaveUp?: boolean;
}

const CompletionToast = ({ show, points, gaveUp }: CompletionToastProps) => {
    if (!show) return null;

    return (
        <div className="fixed bottom-8 left-1/2 z-50 flex flex-col items-center gap-0.5 bg-white border-2 border-black rounded-xl px-8 py-4 shadow-[4px_4px_0_0_black] toast-enter">
            <span className="text-2xl font-bold text-green-700">Completed! 🎉</span>
            {points !== null && points > 0 && (
                <span className="text-lg font-semibold" style={{ color: "var(--color-main-color)" }}>
                    +{points} pts
                </span>
            )}
            {gaveUp && (
                <span className="text-sm text-gray-400">No points awarded</span>
            )}
        </div>
    );
};

export default CompletionToast;
