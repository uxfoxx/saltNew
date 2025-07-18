import React from 'react'
import { HeadLineWithSubLine } from '../../../components'

const BannerOne: React.FC = () => {
    return (
        <div className='relative w-full max-h-[400px] h-[400px] px-2 flex items-center justify-center overflow-hidden'>
            <img
                src='assets/images/home/home 2.webp'
                className='object-cover h-full w-full rounded-lg'
                alt='Banner'
                loading='lazy'
            />
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/10 rounded-lg overflow-hidden'>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:w-2/3 p-4 flex flex-col items-center justify-center text-center'>
                    <HeadLineWithSubLine
                        title="Welcome to Mirissa"
                        subTitle={`Tucked away on the southern coast of Sri Lanka, Mirissa is a slice of paradise where golden beaches, turquoise waters, and palm-lined shores create the perfect tropical escape. Known for its breathtaking sunsets and laid-back charm, Mirissa is more than just a beach town—it's an experience. <br/><br/>
Whether you're chasing waves, relaxing on the beach, or setting out on a whale-watching adventure, Mirissa offers something for every kind of traveler. The vibrant local culture, fresh seafood, and bustling beachfront cafes make it a hotspot for tourists seeking both relaxation and adventure. <br/><br/>
At the heart of it all is Salt Mirissa, your private sanctuary just steps from the sea.
`}
                    />
                </div>
            </div>
        </div>
    )
}

export default BannerOne
