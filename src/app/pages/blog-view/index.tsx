import React, { useEffect } from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { BlogSlide, blogSlides } from "../../data/data";
//  FaFacebookF, FaTwitter, FaInstagram, FaPinterestP 

const BlogView: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // get id from url params pop
    const blogId = location.pathname.split('/').pop() || '';
    const [blog, setBlog] = React.useState<BlogSlide>({} as BlogSlide);

    useEffect(() => {
        // Find the blog details based on blogId
        const foundBlog = blogSlides.find(blog => blog.id === blogId);
        if (foundBlog) {
            setBlog(foundBlog);
        } else {
            navigate('/'); // Redirect to 404 if blog not found
        }
    }, [blogId, navigate]);


    const FaCalendarAltIcon = FaCalendarAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaUserIcon = FaUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    // const FaFacebookFIcon = FaFacebookF as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    // const FaTwitterIcon = FaTwitter as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    // const FaInstagramIcon = FaInstagram as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    // const FaPinterestPIcon = FaPinterestP as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="pt-[60px] bg-white text-gray-800 px-4">
            <div className="w-full mx-auto mt-10 min-h-[45vh] max-h-[45vh] h-[45vh]">
                <img src={blog.image} alt="Blog Header" className="rounded-md w-full  min-h-[45vh] max-h-[45vh] h-[45vh] object-cover" />
            </div>

            <div className="mx-auto px-4 py-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{blog.title}</h1>
                <div className="flex items-center text-sm text-primaryColor gap-6 mb-6">
                    <div className="flex items-center gap-2"><FaCalendarAltIcon /> {blog.date}</div>
                    <div className="flex items-center gap-2"><FaUserIcon /> {blog.author}</div>
                </div>

                <div className="space-y-6 leading-relaxed text-[15px]">
                    <div dangerouslySetInnerHTML={{ __html: blog.excerpt }} />
                    <div dangerouslySetInnerHTML={{ __html: blog.readMore }} />
                    {/* <img src={blog.image} alt="Blog Inline" className="rounded-lg w-full md:w-2/3 h-full mx-auto" /> */}
                </div>

                {/* <div className="mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-2 px-3 border border-gray-300">
                    <div>
                        <span className="font-semibold mr-2">Tags:</span>
                        <span className="text-sm text-teal-700">Restaurant, Dinner, Pizza, Yummy...</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-sm">Share:</span>
                        <div className="flex gap-6 text-gray-500">
                            <FaFacebookFIcon className="hover:text-blue-600 cursor-pointer" />
                            <FaTwitterIcon className="hover:text-blue-400 cursor-pointer" />
                            <FaInstagramIcon className="hover:text-pink-500 cursor-pointer" />
                            <FaPinterestPIcon className="hover:text-red-600 cursor-pointer" />
                        </div>
                    </div>
                </div> */}
            </div>
        </main>
    );
};

export default BlogView;
