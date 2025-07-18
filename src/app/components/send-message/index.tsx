import React, { useState } from 'react'
import InputField from '../form-fields/inputField';
import { toast } from 'react-toastify';
import { CustomError } from '../../../types';
import { POST } from '../../auth/AxiosHelper';

interface SendMessageProps {
    id?: string;
}

const SendMessage: React.FC<SendMessageProps> = ({ id }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        streetAddress: "",
        city: "",
        country: "",
        postalCode: "",
        message: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value, } = e.target;
        const newValue = type === "checkbox" ? !formData[name as keyof typeof formData] : value;
        setFormData({
            ...formData,
            [name]: newValue
        });
    }

    // send-mail
    const handleSendMessage = async () => {
        try {
            setIsLoaded(true)
            const response = await POST('/mail/send-mail', formData)
            if (response.status === 200) {
                toast.success('Message sent successfully')
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    streetAddress: "",
                    city: "",
                    country: "",
                    postalCode: "",
                    message: "",
                })
                setIsLoaded(false)
            }
        } catch (error) {
            setIsLoaded(false)
            toast.error((error as CustomError).response?.data?.message || (error as CustomError).response?.data?.error || 'Something went wrong');
        }
    }
    return (
        <form className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
                <InputField
                    label='First Name'
                    type="text"
                    id={`firstName${id ? `-${id}` : ""}`}
                    name="firstName"
                    placeholder="First Name"
                    className="text-black"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                />
                <InputField
                    label='Last Name'
                    type="text"
                    id={`lastName${id ? `-${id}` : ""}`}
                    name="lastName"
                    placeholder="Last Name"
                    className="text-black"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <InputField
                label='Email'
                type="email"
                id={`email${id ? `-${id}` : ""}`}
                name="email"
                placeholder="Email"
                className="text-black"
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            <InputField
                label='Phone Number'
                type="text"
                id={`phoneNumber${id ? `-${id}` : ""}`}
                name="phoneNumber"
                placeholder="Phone Number"
                className="text-black"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
            />
            <InputField
                label='Street Address'
                type="text"
                id={`streetAddress${id ? `-${id}` : ""}`}
                name="streetAddress"
                placeholder="Street Address"
                className="text-black"
                value={formData.streetAddress}
                onChange={handleInputChange}
                required
            />
            <div className="flex flex-col md:flex-row md:space-x-4">
                <InputField
                    label='City'
                    type="text"
                    id={`city${id ? `-${id}` : ""}`}
                    name="city"
                    placeholder="City"
                    className="text-black"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                />
                <InputField
                    label='Country'
                    type="text"
                    id={`country${id ? `-${id}` : ""}`}
                    name="country"
                    placeholder="Country"
                    className="text-black"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <InputField
                label='Postal Code'
                type="text"
                id={`postalCode${id ? `-${id}` : ""}`}
                name="postalCode"
                placeholder="Postal Code"
                className="text-black"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
            />
            <InputField
                label='Message'
                type="textarea"
                id={`message${id ? `-${id}` : ""}`}
                name="message"
                placeholder="Message"
                className="text-black"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                required
            />
            <button
                className="bg-tertiaryOrange text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                onClick={handleSendMessage}
                disabled={!formData.email || !formData.message || !formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.streetAddress || !formData.city || !formData.country || !formData.postalCode || isLoaded}
            >
                {isLoaded ? 'Sending...' : 'Send Message'}
            </button>

        </form>
    )
}

export default SendMessage