import React from 'react'

interface AdminHeadTitleProps {
    title?: string;
    subtitle?: string;
    content?: React.ReactNode;
}
const AdminHeadTitle: React.FC<AdminHeadTitleProps> = ({ title, subtitle, content }) => {
    return (
        <div className='pb-5'>
            <div className='flex flex-col md:flex-row md:items-end md:justify-between'>
                <div>
                    {title && <h1 className='text-2xl font-semibold'>{title}</h1>}
                    {subtitle && <p className='text-sm text-gray-500'>{subtitle}</p>}
                    {!title && !subtitle && <h1 className='text-2xl font-semibold'>Admin</h1>}
                </div>
                {content && <div className='mt-5'>{content}</div>}
            </div>
        </div>

    )
}

export default AdminHeadTitle

