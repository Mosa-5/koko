import { useParams } from "react-router-dom";
import { handArray } from "@/DummyDataHands";
import PageHeader from "@/components/pageHeader";

const ManualPage = () => {
    const { lang } = useParams();

    const sorted = [...handArray].sort((a, b) =>
        (a.letter ?? "").localeCompare(b.letter ?? "")
    );

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader backTo={`/catalog/${lang}`} lang={lang ?? ""} />
        <div className="max-w-7xl m-auto flex flex-col items-center gap-10 px-4 md:px-8 py-6">
            <h1 className="text-2xl font-semibold">{lang} — Sign Manual</h1>

            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-4 w-full">
                {sorted.map(({ letter, image }) => (
                    <div key={letter} className="flex flex-col items-center gap-2 border-2 border-black rounded-xl p-2 bg-white">
                        <img
                            src={image}
                            alt={`Sign for ${letter}`}
                            className="w-full aspect-square object-contain"
                        />
                        <span className="text-lg font-bold">{letter}</span>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default ManualPage;
