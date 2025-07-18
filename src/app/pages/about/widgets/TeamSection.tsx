import TeamMemberCard from "./TeamMemberCard";



const team = [
    { name: "Mark Henry", role: "Owner", image: "/assets/images/about/Team 1.webp" },
    { name: "Lucky Helen", role: "Chef", image: "/assets/images/about/Team 2.webp" },
    { name: "Lucky Helen", role: "Chef", image: "/assets/images/about/Team 3.webp" },
    { name: "Moon Henry", role: "Founder", image: "/assets/images/about/Team 4.webp" },
];

const TeamSection: React.FC = () => {
    return (
        <section className="my-12 px-4">
            <h2 className="text-2xl font-bold mb-6">TEAM MEMBER</h2>
            <p className="text-gray-600 mb-10 text-sm">
                Our dedicated team is the heartbeat of Salt. Get to know the faces behind your experience:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {team.map((member, idx) => (
                    <TeamMemberCard key={idx} {...member} />
                ))}
            </div>
        </section>
    );
};

export default TeamSection;
