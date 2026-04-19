import { Link } from "react-router-dom";
import { useScore } from "@/hooks/useScore";

interface PageHeaderProps {
    backTo: string;
    lang: string;
}

const PageHeader = ({ backTo, lang }: PageHeaderProps) => {
    const { langScore } = useScore(lang);

    return (
        <div className="px-4 md:px-8 py-3 flex items-center justify-between flex-shrink-0">
            <Link
                to={backTo}
                className="inline-flex items-center gap-2 text-lg font-semibold hover:text-main-color transition-colors"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
            </Link>
            <div className="flex items-center gap-1.5 font-semibold text-base border-2 border-black rounded-lg px-3 py-1 shadow-[2px_2px_0_0_black]">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="10,2 12.9,7.6 19,8.5 14.5,12.9 15.6,19 10,16 4.4,19 5.5,12.9 1,8.5 7.1,7.6" fill="var(--color-main-color)" stroke="black" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                <span>{langScore} pts</span>
            </div>
        </div>
    );
};

export default PageHeader;
