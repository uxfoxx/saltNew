import React from 'react'
import { HeadLineWithSubLine } from '../../../components'
import TreeWaveBackground from '../../../components/common/TreeWaveBackground'

const WelcomePage: React.FC = () => {
    return (
        <div className='relative'>
            <TreeWaveBackground />
            <div className='flex  justify-center w-full bg-cover bg-center relative py-20'>
                <div className='flex flex-col items-center justify-center text-center w-full sm:w-2/3 p-4'>
                    <HeadLineWithSubLine
                        title="Welcome to Salt Resort & Restaurant"
                        subTitle={`Step into a world of coastal elegance and modern tranquility. Salt Resort & Restaurant in Mirissa offers a refined escape where comfort, style, and the beauty of Sri Lanka’s southern coast come together. Whether you're planning a romantic retreat, a family holiday, or a peaceful solo getaway, our resort delivers the perfect setting. With uninterrupted ocean views, top-tier amenities, and warm, attentive service, your dream vacation begins here.`}
                        subTitleClassName='text-black'
                        titleClassName='text-black'
                    />
                </div>
            </div>
        </div>
    )
}

export default WelcomePage