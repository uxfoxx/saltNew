import React from 'react'

const OurLocation: React.FC = () => {
    return (

        <div className='w-full'>
            <iframe
                title='Google Maps'
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d20785.211191949133!2d174.7772988757908!3d-36.880010180920536!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d487eb834f2ab%3A0xc55f500d2a042ce!2s17%20Margot%20Street%2C%20Epsom%2C%20Auckland%201051%2C%20New%20Zealand!5e0!3m2!1sen!2sus!4v1719554832523!5m2!1sen!2sus"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    )
}

export default OurLocation
