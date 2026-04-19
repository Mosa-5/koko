import { Link, useParams } from "react-router-dom";
import { CATEGORY_ORDER, signLanguages } from "../catalog/dummyData";
import { Button } from "@/components/ui/button";
import { SignItIcon } from "@/components/svg/sign-it-icon";
import { ReadItIcon } from "@/components/svg/read-it-icon";
import { WatchItIcon } from "@/components/svg/watch-it-icon";
import PageHeader from "@/components/pageHeader";
import type { ReactNode } from "react";

const CATEGORY_ICONS: Record<string, ReactNode> = {
    "Sign It":  <SignItIcon />,
    "Read It":  <ReadItIcon />,
    "Watch It": <WatchItIcon />,
};

const LanguageExercises = () => {
    const { lang } = useParams();

    const language = signLanguages.find(item => item.name === lang);
    const exercises = language?.exercises ?? [];

    const grouped = CATEGORY_ORDER
        .map(cat => ({
            category: cat,
            items: exercises.filter(e => e.category === cat),
        }))
        .filter(g => g.items.length > 0);

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader backTo="/catalog" lang={lang ?? ""} />
            <div className="w-full px-4 max-w-3xl flex flex-col gap-10 items-center m-auto justify-center font-semibold tracking-widest py-6">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-3xl">{lang} Exercises</h1>
                <Link to={`/catalog/${lang}/manual`}>
                    <Button>Manual</Button>
                </Link>
            </div>

            <div className="flex flex-col gap-8 w-full">
                {grouped.map(({ category, items }) => (
                    <div key={category} className="flex flex-col gap-3">
                        <h2 className="text-lg border-b-2 border-black pb-1 flex items-center gap-2">
                            <span>{CATEGORY_ICONS[category]}</span>
                            <span>{category}</span>
                        </h2>

                        <div className="flex flex-col gap-3">
                            {items.map((exercise, index) => (
                                <Link
                                    key={exercise.id}
                                    to={`/catalog/${lang}/exercise/${exercise.id}`}
                                    className="w-full"
                                >
                                    <Button className="w-full flex justify-between p-6 text-lg italic tracking-widest">
                                        <span>Level {index + 1}</span>
                                        <span className="text-sm font-normal not-italic tracking-normal opacity-70">{exercise.level}</span>
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default LanguageExercises;
