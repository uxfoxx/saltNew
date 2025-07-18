import { useState } from "react";

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white rounded shadow p-4 mb-4">
            <div className="flex items-center justify-between cursor-pointer">
                <span className="font-medium text-black">{question}</span>
                {open ? (
                    <div onClick={() => setOpen(!open)} className="cursor-pointer bg-primaryColor rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="15px" width="15px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xmlSpace="preserve">
                            <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
                        </svg>
                    </div>
                ) : (
                    <div onClick={() => setOpen(!open)} className="cursor-pointer rounded-full p-2 rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="15px" width="15px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xmlSpace="preserve">
                            <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
                        </svg>
                    </div>
                )}
            </div>
            {open && <p className="mt-2 text-sm text-gray-600">{answer}</p>}
        </div>
    );
};

const FAQSection: React.FC = () => {

    const FAQ = [
        {
            question: "What is the best time to visit Mirissa?",
            answer: "The best time to visit is from December to April, when the weather is sunny and the seas are calm—perfect for beach days, whale watching, and water sports."
        },
        {
            question: "Is Salt Mirissa close to the beach?",
            answer: "Yes, Salt Mirissa is located directly on the beachfront, giving you immediate access to the sea and stunning sunset views."
        },
        {
            question: "Do you offer airport transfers?",
            answer: "Yes, we provide airport pickup and drop-off services upon request. Please let us know in advance to make arrangements."
        },
        {
            question: "Are meals included in the stay?",
            answer: "Select packages include complimentary breakfast. Guests can also enjoy chef-prepared meals or use the villa's fully equipped kitchen."
        },
        {
            question: "What activities can I do in Mirissa?",
            answer: "Popular activities include whale watching, surfing, snorkeling, beach yoga, fishing tours, and exploring nearby sights like Secret Beach and Coconut Tree Hill."
        }
    ]

    return (
        <section className="bg-[#3B7576] text-white py-16 px-6">
            <h2 className="text-center text-3xl uppercase font-bold mb-6">Your Questions Answered, Your Design Journey Simplified</h2>
            <p className="text-center text-sm mb-8">We understand that planning your stay can raise questions. Here are some of the most frequently asked questions to help you.</p>
            <div className="max-w-2xl mx-auto">
                {FAQ.map((item, index) => (
                    <FAQItem key={index} question={item.question} answer={item.answer} />
                ))}
            </div>
        </section>
    )
}

export default FAQSection;