import React, { useEffect } from 'react';

interface ModalProps {
    title?: string;
    content: React.ReactNode;
    onClose: () => void;
    onConfirm: () => void;
    confirmText?: string;
    cancelText: string;
    confirmButtonClass: string;
    disableConfirm?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ title, content, onClose, onConfirm, confirmText, cancelText, confirmButtonClass, disableConfirm = false, size = 'md' }) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50 z-50" onClick={onClose} />
            <div
                // className='bg-white rounded-lg w-[95%] sm:w-[50%] z-50 relative flex flex-col justify-between max-h-[calc(100dvh-100px)]'
                className={`bg-white rounded-lg w-[95%] sm:w-[50%] z-50 relative flex flex-col justify-between max-h-[calc(100dvh-100px)] ${size === 'sm' ? 'sm:w-[30%]' : size === 'md' ? 'sm:w-[50%]' : size === 'lg' ? 'sm:w-[70%]' : size === 'xl' ? 'sm:w-[90%]' : ''}`}
            >
                <div onClick={onClose} className="absolute top-0 right-0 p-5 cursor-pointer z-[9999] text-primaryColor hover:text-secondaryColor transform transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                {title &&
                    <div className='px-5 pt-5'>
                        <h2 className="text-xl">{title}</h2>
                        <hr className='mt-2' />
                    </div>
                }
                <div className="bg-white rounded-lg w-full overflow-auto py-3 px-5 max-h-[calc(100dvh-320px)]">
                    {content}
                </div>
                <div className='pb-5 px-5 h-20'>
                    <hr className='w-full' />
                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            onClick={onClose}
                            className="px-4 min-w-[100px] py-2 bg-gray-300 rounded"
                        >
                            {cancelText}
                        </button>
                        {confirmText &&
                            <button
                                onClick={onConfirm}
                                className={`px-4 min-w-[100px] py-2 transform transition-all duration-300 ease-in-out ${confirmButtonClass} text-white rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-primaryColor`}
                                disabled={disableConfirm}
                            >
                                {confirmText}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Modal;
