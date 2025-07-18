import { useNavigate } from "react-router-dom";

interface InforIntroProps {
    reverse?: boolean;
    imageContent?: string;
    imageUrl?: string;
    title?: string;
    description?: string;
    reserveLink?: string;
    reserveText?: string;
    state?: any;

}
const InforIntro: React.FC<InforIntroProps> = ({
    reverse = false,
    imageUrl = "",
    imageContent = "",
    title = "",
    description = "",
    reserveLink = "",
    reserveText = "",
    state = {}
}) => {
    const navigate = useNavigate();

    return (
        <div className={`gap-8 px-4 py-12 mx-auto flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} gap-8 md:items-center`}>
            <div className="relative flex items-center justify-center aspect-square max-w-[520px] w-full overflow-hidden rounded-xl">
                <div className="bg-black/30 absolute top-0 left-0 w-full h-full" />
                <img src={imageUrl || "/assets/images/background/background-2.png"} alt="Chef" className="rounded-xl object-cover aspect-square" />
                {imageContent && (
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 ">
                        <h2 className="text-sm sm:text-2xl md:text-xl font-bold text-white text-center md:whitespace-nowrap uppercase">
                            {imageContent}
                        </h2>
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-center text-sm">
                {title && <h2 className="text-sm md:text-3xl font-bold mb-4 uppercase">{title}</h2>}
                {description && <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: description }} />}
                {reserveLink && reserveText && (
                    <button
                        onClick={() => {
                            navigate(reserveLink, { state });
                        }}
                        className="bg-white text-sm text-primaryColor rounded-xl flex items-center gap-2 max-w-max px-4 py-2 hover:border-[0.5px] hover:border-primaryColor transition duration-300 ease-in-out"
                    >
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.375 1.27344H2.625C2.38301 1.27344 2.1875 1.46895 2.1875 1.71094V13.0859C2.1875 13.3279 2.38301 13.5234 2.625 13.5234H11.375C11.617 13.5234 11.8125 13.3279 11.8125 13.0859V1.71094C11.8125 1.46895 11.617 1.27344 11.375 1.27344ZM9.13281 5.12754L8.49707 4.66406L7.82031 5.14805V2.09375H9.13281V5.12754Z"
                                fill="currentColor" />
                        </svg>
                        {reserveText}
                    </button>
                )}
            </div>
        </div>
    )
};

export default InforIntro;