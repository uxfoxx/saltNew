import React from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
    id: string;
    title: string;
    date: string;
    author: string;
    excerpt: string;
    image: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, date, author, excerpt, image }) => {
    const navigate = useNavigate();
    const FaCalendarAltIcon = FaCalendarAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaUserIcon = FaUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    return (
        <div
            className="bg-white rounded-lg shadow-custom3 border border-gray-200 overflow-hidden flex flex-col p-2 cursor-pointer"
            onClick={() => navigate(`/blog/${id}`)}
        >
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <div className="flex items-center text-gray-500 text-sm gap-4 mb-3">
                    <div className="flex items-center gap-1"><FaCalendarAltIcon /> {date}</div>
                    <div className="flex items-center gap-1"><FaUserIcon /> {author}</div>
                </div>
                <div className="text-gray-600 text-sm mb-4" dangerouslySetInnerHTML={{ __html: excerpt }} />
                <div
                    className="bg-white text-sm text-primaryColor px-2 rounded-xl flex items-center gap-2"

                >
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.375 1.27344H2.625C2.38301 1.27344 2.1875 1.46895 2.1875 1.71094V13.0859C2.1875 13.3279 2.38301 13.5234 2.625 13.5234H11.375C11.617 13.5234 11.8125 13.3279 11.8125 13.0859V1.71094C11.8125 1.46895 11.617 1.27344 11.375 1.27344ZM9.13281 5.12754L8.49707 4.66406L7.82031 5.14805V2.09375H9.13281V5.12754Z"
                            fill="currentColor" />
                    </svg>
                    Read More
                </div>
            </div>
        </div>
    );
};

export default BlogCard; 