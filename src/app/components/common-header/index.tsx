import React from 'react'
import { motion } from 'framer-motion';
import { container, item } from '../../Constant';
import { Link } from 'react-router-dom';
interface CommonHeaderProps {
    title: string;
    bgImage?: string;
    mainPath?: { name: string, path: string }[];
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
    title,
    bgImage = 'assets/images/background/bg-image-6.png',
    mainPath

}) => {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={` flex flex-col items-center justify-end min-h-[130px] uppercase overflow-hidden relative`}
        >
            <div className='h-[70px] w-full absolute top-0 left-0'>
                <img
                    src={bgImage}
                    alt="bgImage"
                    className="object-cover w-full h-full"
                />
                <div className='bg-[#000000b3] w-full h-full absolute top-0 left-0'></div>
            </div>
            <motion.div
                animate={{
                    opacity: 1,
                    left: 0,
                    right: 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                    delay: 0.2,
                }}
                variants={item}
                className="z-[1] container text-[14px] text-black text-right py-2 tracking-wide gap-4 flex items-center w-full"
            >
                <i className='fa fa-home text-[18px]'> </i>
                {mainPath && mainPath.length > 0 &&
                    mainPath.map((path, index) => (
                        <div key={index} className='gap-4 flex items-center'>
                            <i className='fa fa-arrow-right text-[#000]'></i>
                            <Link to={path.path ? path.path : '/'} className='font-medium text-[#000] hover:text-tertiaryOrange cursor-pointer'>
                                {path.name ? path.name : 'Main Path'}
                            </Link>
                        </div>
                    ))
                }
                <div className='gap-4 flex items-center'>
                    <i className='fa fa-arrow-right text-black'></i>
                    <span className='font-medium text-tertiaryOrange'>{title ? title : 'Header Title'}</span>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CommonHeader;