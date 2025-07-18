const GoogleMapEmbed: React.FC = () => {
    return (
        <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.3595627009145!2d80.4584788!3d5.9450867999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae13fd4994e1e13%3A0xabfec3e163349acd!2sSalt%20Mirissa%20Resort!5e0!3m2!1sen!2slk!4v1749058788661!5m2!1sen!2slk"
            className="w-full h-[400px] rounded-lg border"
            allowFullScreen
            loading="lazy"
        ></iframe>
    );
};

export default GoogleMapEmbed;
