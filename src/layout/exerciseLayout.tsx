import { Outlet, useParams } from "react-router-dom";
import PageHeader from "@/components/pageHeader";

const ExerciseLayout = () => {
    const { lang } = useParams();

    return (
        <div className="flex flex-col h-screen">
            <PageHeader backTo={`/catalog/${lang}`} lang={lang ?? ""} />
            <div className="flex-1 min-h-0 overflow-auto w-full">
                <Outlet/>
            </div>
        </div>
    );
};

export default ExerciseLayout;
