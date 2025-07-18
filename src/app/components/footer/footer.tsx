import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { FiInstagram, FiFacebook, } from 'react-icons/fi';

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const FiFacebookIcon = FiFacebook as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FiInstagramIcon = FiInstagram as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaPhoneAltIcon = FaPhoneAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaEnvelopeIcon = FaEnvelope as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaMapMarkerAltIcon = FaMapMarkerAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaWhatsappIcon = FaWhatsapp as unknown as React.FC<React.SVGProps<SVGSVGElement>>; // Using phone icon for WhatsApp
    return (
        <footer className="bg-gradient-to-t from-[#3B7576] to-[#529C9D] text-white">
            <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-start gap-4 md:gap-10">

                <div className="flex items-center justify-center">
                    <img
                        className="h-[60px]"
                        src="/assets/images/logo/logo.svg"
                        alt="Workflow"
                    />
                </div>

                <div className="flex flex-col gap-6 text-sm">
                    <nav className="flex gap-4 flex-wrap font-medium">
                        <Link to="/" className="hover:underline">Home</Link>
                        <Link to="/stay-with-us" className="hover:underline">Rooms</Link>
                        <Link to="/blog" className="hover:underline">Blogs</Link>
                        <Link to="/about" className="hover:underline">About Us</Link>
                        <Link to="/contact-us" className="hover:underline">Contact Us</Link>
                    </nav>

                    {/* Contact Info */}
                    <div className="space-y-2">
                        <h4 className="text-xs uppercase text-gray-200 tracking-wider mb-1">Contact Us</h4>
                        <a className="flex items-center gap-3" href="tel:+94785779779" rel="noopener noreferrer">
                            <FaPhoneAltIcon />
                            <p>+94 785 779 779</p>
                        </a>
                        <a className="flex items-center gap-3" href="mailto:info@saltmirissa.lk" rel="noopener noreferrer">
                            <FaEnvelopeIcon />
                            <p>info@saltmirissa.lk</p>
                        </a>
                        <a className="flex items-center gap-3" href="https://maps.app.goo.gl/US8FXHuKmvweUThY8" target="_blank" rel="noopener noreferrer">
                            <FaMapMarkerAltIcon />
                            <p>Address: 220/8 Liyanaralage Watta, Udupila Road, Mirissa 81740</p>
                        </a>
                    </div>
                </div>

                {/* Right: Social Links */}
                <div className="flex flex-col items-start md:items-end gap-4 md:justify-between">
                    <div className="text-xs text-white text-right md:block hidden md:pb-10">
                        © 2024 — Copyright
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-white px-4 py-1 rounded-full text-sm hover:bg-white hover:text-[#3B7576] transition flex items-center gap-2"
                        >
                            <FiFacebookIcon className="text-lg" /> Facebook
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-white px-4 py-1 rounded-full text-sm hover:bg-white hover:text-[#3B7576] transition flex items-center gap-2"
                        >
                            <FiInstagramIcon className="text-lg w-5 h-5" /> Instagram
                        </a>
                        <a
                            href="https://www.tripadvisor.com/Restaurant_Review-g1407334-d13197095-Reviews-Salt_Mirissa-Mirissa_Southern_Province.html"
                            target='_blank'
                            rel="noopener noreferrer"
                            className="border border-white px-4 py-1 rounded-full text-sm hover:bg-white hover:text-[#3B7576] transition flex items-center gap-2"
                        >
                            <img src="/assets/images/icons/tripadvisor.png" alt="Salt Mirissa Logo" className="w-5 h-5 rounded-full" />
                            TripAdvisor
                        </a>
                        <a
                            href="https://api.whatsapp.com/send?phone=94785779779&text=Hello%20Salt%20Mirissa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-white px-4 py-1 rounded-full text-sm hover:bg-white hover:text-[#3B7576] transition flex items-center gap-2"
                        >
                            <FaWhatsappIcon className="text-lg w-5 h-5" /> Whatsapp
                        </a>
                    </div>
                    <div className="text-xs text-white text-center block md:hidden">
                        © 2024 — Copyright
                    </div>
                </div>
            </div>
            <div>
                <div className="bg-[#3B7576] py-4 flex flex-col sm:flex-row justify-center items-center gap-2">
                    <div onClick={() => navigate('/privacy-policy')} className="text-xs text-white text-center py-1 cursor-pointer hover:underline">
                        Privacy Policy
                    </div>
                    <div onClick={() => navigate('/refund-policy')} className="text-xs text-white text-center py-1 cursor-pointer hover:underline">
                        Refund Policy
                    </div>
                    <div onClick={() => navigate('/terms-and-conditions')} className="text-xs text-white text-center py-1 cursor-pointer hover:underline">
                        Terms and Conditions
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
