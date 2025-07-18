import React, { useEffect, useState } from 'react';
import { AdminHeadTitle, InputField } from '../../components';
import { EmailIF } from '../../../types';
import { GET } from '../../auth/AxiosHelper';
import Loading from '../../../global/loading';

const Email: React.FC = () => {
    const [emails, setEmails] = useState<EmailIF[]>([]);
    const [filters, setFilters] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchMail = async () => {
        try {
            setIsLoading(true);
            const response = await GET('mail/all');
            setEmails(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching mail:', error);
        }
    };

    useEffect(() => {
        if (filters) {
            const filteredEmails = emails.filter((mail) => {
                return Object.values(mail).some((val) =>
                    String(val).toLowerCase().includes(filters.toLowerCase())
                );
            });
            setEmails(filteredEmails);
        } else {
            fetchMail();
        }
        // eslint-disable-next-line
    }, [filters]);

    useEffect(() => {
        fetchMail();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className='p-4'>
            <AdminHeadTitle
                title='Emails'
                subtitle='Manage all emails sent by users'
                content={<div>
                    <InputField
                        id='filter'
                        type='text'
                        name='filter'
                        label='Search'
                        placeholder='Search by email, first name, last name, phone number, address, city, country, postal code, or message'
                        onChange={(e) => setFilters(e.target.value)}
                    />
                </div>}
            />
            <div className="block overflow-auto w-full bg-white rounded-md">
                <table className="border-collapse table-auto w-full whitespace-nowrap">
                    <thead>
                        <tr className='bg-primaryColor text-white'>
                            <th className='px-4 py-2 text-left'>First Name</th>
                            <th className='px-4 py-2 text-left'>Last Name</th>
                            <th className='px-4 py-2 text-left'>Email</th>
                            <th className='px-4 py-2 text-left'>Phone Number</th>
                            <th className='px-4 py-2 text-left'>Street Address</th>
                            <th className='px-4 py-2 text-left'>City</th>
                            <th className='px-4 py-2 text-left'>Country</th>
                            <th className='px-4 py-2 text-left'>Postal Code</th>
                            <th className='px-4 py-2 text-left'>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails && emails.length > 0 ? emails.map((mail, index) => (
                            <tr className={`border-b ${index % 2 === 0 ?
                                'bg-gray-200 hover:bg-gray-300' :
                                'bg-gray-100 hover:bg-gray-300'
                                }  h-12`}
                            >
                                <td className='px-4 py-2 text-left'>{mail.firstName || 'N/A'}</td>
                                <td className='px-4 py-2 text-left'>{mail.lastName || 'N/A'}</td>
                                <td className='px-4 py-2 text-left'>{mail.email || 'N/A'}</td>
                                <td className='px-4 py-2 text-left'>{mail.phoneNumber || 'N/A'}</td>
                                <td className='px-4 py-2 text-left'>{mail.streetAddress || 'N/A'}</td>
                                <td className='px-4 py-2 text-left'>{mail.city || 'N/A'}</td>
                                <td className='px-4 py-2 text-left'>{mail.country || 'N/A'}</td>
                                <td className='px-4 py-2 text-left'>{mail.postalCode || 'N/A'}</td>
                                <td className='px-4 py-2 text-left'>{mail.message || 'N/A'}</td>
                            </tr>
                        )) : <tr><td colSpan={9}>No emails found</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Email;
