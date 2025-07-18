interface FeatureCardProps {
    Icon: string | React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-white shadow-custom6 rounded-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <div className="text-4xl mb-3 max-w-20 w-20">{typeof Icon === 'string' ? <img src={Icon} alt={title} /> : <Icon />}</div>
        <h4 className="font-semibold text-lg mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
);

export default FeatureCard;
