import React from 'react'

interface HeadLineWithSubLineProps {
    title?: string;
    subTitle?: string;
    titleClassName?: string;
    subTitleClassName?: string;
}

const HeadLineWithSubLine: React.FC<HeadLineWithSubLineProps> = ({
    title,
    subTitle,
    titleClassName = "text-white",
    subTitleClassName = "text-white"
}) => {
    return (
        <>
            <h1 className={`text-[40px] font-bold uppercase ${titleClassName}`}>{title}</h1>
            <div className={`text-xs ${subTitleClassName}`} dangerouslySetInnerHTML={{ __html: subTitle || '' }}></div>
        </>
    )
}

export default HeadLineWithSubLine