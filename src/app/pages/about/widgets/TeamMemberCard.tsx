interface TeamMemberCardProps {
    image: string;
    name: string;
    role: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ image, name, role }) => (
    <div className="text-center w-full h-72 max-h-72 min-h-72 relative rounded-lg overflow-hidden shadow-sm">
        <img src={image} alt={name} className="w-full h-full object-cover mb-4" />
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 ">
            <h4 className="font-semibold text-lg">{name}</h4>
            <p className="text-sm text-gray-600">{role}</p>
        </div>
    </div>
);

export default TeamMemberCard;
