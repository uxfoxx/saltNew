import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { FiInstagram, FiFacebook, } from 'react-icons/fi';
import { InputField } from '../../../components';
import { useState } from 'react';

const ContactInfoCard: React.FC = () => {
    const FiFacebookIcon = FiFacebook as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FiInstagramIcon = FiInstagram as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaPhoneAltIcon = FaPhoneAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaEnvelopeIcon = FaEnvelope as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaMapMarkerAltIcon = FaMapMarkerAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const FaWhatsappIcon = FaWhatsapp as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        subject: 'Stay with us',
        message: '',
    });
    return (
        <section className="mx-auto py-12 px-4 grid md:grid-cols-5 gap-8 shadow-custom5 rounded-lg bg-white mt-8">
            <div className="bg-gradient-to-b from-teal-700 to-teal-500 text-white rounded-lg p-6 flex flex-col justify-between md:col-span-2">
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <div>
                    <div className="space-y-8 text-sm">
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
                <div className="flex gap-4 mt-8">
                    <a
                        href="/https://www.facebook.com/share/1AVVEGDW4Q/?mibextid=wwXIfr"
                        target='_blank'
                        className="bg-black hover:bg-white text-white hover:text-black ease-in-out duration-300 p-2 rounded-full"
                        rel="noopener noreferrer"
                    >
                        <FiFacebookIcon className="text-lg" />
                    </a>
                    <a
                        href="https://www.instagram.com/saltmirissa?igsh=MTY3NW4zaW13cTd6bQ=="
                        target='_blank'
                        className="bg-black hover:bg-white text-white hover:text-black ease-in-out duration-300 p-2 rounded-full"
                        rel="noopener noreferrer"
                    >
                        <FiInstagramIcon className="text-lg w-5 h-5" />
                    </a>
                    <a
                        href="https://www.tripadvisor.com/Restaurant_Review-g1407334-d13197095-Reviews-Salt_Mirissa-Mirissa_Southern_Province.html"
                        target='_blank'
                        className="bg-black hover:bg-white text-white hover:text-black ease-in-out duration-300 p-2 rounded-full"
                        rel="noopener noreferrer"
                    >
                        <img src="/assets/images/icons/tripadvisor.png" alt="Salt Mirissa Logo" className="w-5 h-5 rounded-full" />

                    </a>
                    <a
                        href="https://api.whatsapp.com/send?phone=94785779779&text=Hello%20Salt%20Mirissa"
                        target="_blank"
                        className="bg-black hover:bg-white text-white hover:text-black ease-in-out duration-300 p-2 rounded-full"
                        rel="noopener noreferrer"
                    >
                        <FaWhatsappIcon className="text-lg w-5 h-5" />
                    </a>
                </div>
            </div>
            <form className="space-y-6 md:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        type="text"
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        className="w-full"
                        required={true}
                        min={1}
                        max={10}
                    />
                    <InputField
                        type="text"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full"
                        required={true}
                    />
                    <InputField
                        type="email"
                        label="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="w-full"
                        required={true}
                    />
                    <InputField
                        type="text"
                        label="Phone Number"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className="w-full"
                        required={true}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">Select Subject?</label>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <label><input type="radio" name="subject" defaultChecked /> Stay with us</label>
                        <label><input type="radio" name="subject" /> Dine with us</label>
                        <label><input type="radio" name="subject" /> Events</label>
                        <label><input type="radio" name="subject" /> Other</label>
                    </div>
                </div>

                <InputField
                    type="textarea"
                    label="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    id="message"
                    name="message"
                    placeholder="Write your message.."
                    className="w-full h-32 p-2 text-sm placeholder:font-thin"
                    required={true}
                    outline={true}

                />

                <button type="submit" className="bg-teal-700 text-white px-5 py-2 rounded hover:bg-teal-800 text-sm font-semibold float-right">
                    ➤ Send Message
                </button>
            </form>
        </section>
    );
};

export default ContactInfoCard;
