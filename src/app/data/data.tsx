import { RoomIf } from "../../types";

interface ServiceOptions {
    id: number;
    label: string;
    value: string;
}

export const servicesOptionsArray: ServiceOptions[] = [
    {
        id: 1,
        label: 'Domestic Cleaning',
        value: 'domestic-cleaning'
    },
    {
        id: 2,
        label: 'Eco Friendly Cleaning Services',
        value: 'eco-friendly-cleaning'
    },
    {
        id: 3,
        label: 'Commercial Cleaning',
        value: 'commercial-cleaning'
    },
    {
        id: 4,
        label: 'One Off Deep Cleaning',
        value: 'one-off-deep-cleaning'
    },
    {
        id: 5,
        label: 'End Of Tenancy Cleaning Services',
        value: 'end-of-tenancy-cleaning'
    },
    {
        id: 6,
        label: 'Carpet Cleaning Services',
        value: 'carpet-cleaning'
    },
    {
        id: 7,
        label: 'Oven Cleaning',
        value: 'oven-cleaning'
    }
]


export const roomsArray: RoomIf[] = [
    {
        id: 'af4e5b24cfb4c3e8a0d1f5b2e9c7d6f',
        image: "/assets/images/home/Explore Our Luxury Accommodation 1.webp",
        price: "From LKR 15,000 UPWARDS",
        title: "Deluxe Double Sharing Room",
        description: `A perfect coastal retreat for couples or two guests seeking a serene and stylish escape. This room offers a blend of tropical charm and modern comfort, ideal for soaking in the natural beauty of Mirissa.`,
        amenities: ["Spacious and thoughtfully designed", "Plush double bed for restful nights", "Surrounded by lush greenery and sea breeze"],
        moreDetails: {
            id: 'deluxe-double-sharing-room',
            title: 'Deluxe Double Sharing Room',
            description:
                "Experience a stay where comfort meets convenience. Each Deluxe Double Sharing Room is equipped with essential amenities to ensure a relaxing stay amidst the calm of Mirissa's coast.",
            overview: {
                highlights: [
                    'Flat-screen smart TV',
                    'Air conditioning for your comfort',
                    'Tea/coffee facilities with a kettle and toaster',
                    'Microwave for light meals or reheating',
                    'En-suite bathroom with modern fittings',
                    'Private outdoor space or seating area',
                ],
                notes:
                    'Perfect for couples or solo travelers, this room offers a peaceful setting just moments from the beach.',
            },
            facilities: [
                {
                    icon: '/assets/images/icons/home-wifi.svg',
                    label: 'Free Wi-Fi – Stay connected effortlessly',
                },
                {
                    icon: '/assets/images/icons/home-wifi.svg',
                    label: 'Air Conditioning – Climate control for all seasons',
                },
                {
                    icon: '/assets/images/icons/home-wifi.svg',
                    label: 'Private Parking – Complimentary on-site parking',
                },
                {
                    icon: '/assets/images/icons/home-wifi.svg',
                    label: 'Business Services – Ideal for remote work or meetings',
                },
                {
                    icon: '/assets/images/icons/home-wifi.svg',
                    label: 'Swimming Pool – Refresh and relax at your leisure',
                },
                {
                    icon: '/assets/images/icons/home-wifi.svg',
                    label: 'Top Rated in Area – Trusted and loved by travelers',
                },
            ],
            images: [
                {
                    id: 1,
                    image: '/assets/images/stay-with-us/double room 1.webp',
                },
                {
                    id: 2,
                    image: '/assets/images/stay-with-us/double room 2.webp',
                },
                {
                    id: 3,
                    image: '/assets/images/stay-with-us/double room 3.webp',
                },
                {
                    id: 4,
                    image: '/assets/images/stay-with-us/double room 4.webp',
                },
                {
                    id: 5,
                    image: '/assets/images/stay-with-us/double room 5.webp',
                },
                {
                    id: 6,
                    image: '/assets/images/stay-with-us/double room 6.webp',
                },
            ],
        }
    },
    {
        id: 'b5e4f3a2c6d7e8f9a0b1c2d3e4f5g6h',
        image: "/assets/images/home/Explore Our Luxury Accommodation 3.webp",
        price: "From LKR 22,500 UPWARDS",
        title: "Deluxe Triple Sharing Room",
        description: `Ideal for small families or a group of friends, this triple sharing room offers extra space without compromising on comfort. Unwind in a cozy, coastal setting designed for relaxation and ease.`,
        amenities: ["Roomy layout with tasteful furnishings", "Double bed with an additional single bed", "Close to the beach with peaceful ambiance"],
        moreDetails: {
            id: 'deluxe-triple-sharing-room',
            title: 'Deluxe Triple Sharing Room',
            description:
                "Designed for small families or groups of friends, the Deluxe Triple Sharing Room offers both space and comfort just steps away from the beach. Thoughtfully arranged with practical amenities and relaxing interiors, this room provides a convenient home base for your coastal getaway in Mirissa.",
            overview: {
                highlights: [
                    'Comfortable layout with one double bed and one single bed',
                    'Flat-screen smart TV for entertainment',
                    'Air conditioning for a cool and restful environment',
                    'Tea and coffee facilities with kettle and toaster',
                    'Microwave for quick meal prep or warming up snacks',
                    'Modern en-suite bathroom with hot water',
                    'Private seating area for quiet mornings or evening chats',
                ],
                notes:
                    'Whether you\'re traveling with friends, family, or a mix of both, this room offers a relaxed and flexible setting with easy access to the best of Salt Mirissa.',
            },
            facilities: [
                {
                    icon: '/assets/images/icons/home-wifi.svg',
                    label: 'Free Wi-Fi – Stay connected effortlessly',
                },
                {
                    icon: '/assets/images/icons/home-wifi.svg',
                    label: 'Air Conditioning – Climate control for all seasons',
                },
                {
                    icon: '/assets/images/icons/home-wifi.svg',
                    label: 'Private Parking – Complimentary on-site parking',
                },
                {
                    icon: '/assets/images/icons/home-wifi.svg',
                    label: 'Business Services – Ideal for remote work or meetings',
                },
                {
                    icon: '/assets/images/icons/home-wifi.svg',
                    label: 'Top Rated in Area – Trusted and loved by travelers',
                },
            ],
            images: [
                {
                    id: 1,
                    image: '/assets/images/stay-with-us/triple room 1.webp',
                },
                {
                    id: 2,
                    image: '/assets/images/stay-with-us/triple room 2.webp',
                },
                {
                    id: 3,
                    image: '/assets/images/stay-with-us/triple room 3.webp',
                },
                {
                    id: 4,
                    image: '/assets/images/stay-with-us/triple room 4.webp',
                },
                {
                    id: 5,
                    image: '/assets/images/stay-with-us/triple room 5.webp',
                },
            ],
        }
    },
];

interface CommonSlide {
    id: number;
    image: string;
}

export const commonSlides: CommonSlide[] = [
    {
        id: 1,
        image: '/assets/images/home/Home 10-1.webp',
    },
    {
        id: 2,
        image: '/assets/images/home/Home 10-2.webp',
    },
    {
        id: 3,
        image: '/assets/images/home/Home 10-3.webp',
    },
    {
        id: 4,
        image: '/assets/images/home/Home 10-4.webp',
    },
    {
        id: 5,
        image: '/assets/images/home/Home 10-5.webp',
    },
    {
        id: 6,
        image: '/assets/images/home/Home 10-6.webp',
    },
    {
        id: 7,
        image: '/assets/images/home/Home 10-7.webp',
    },
    {
        id: 8,
        image: '/assets/images/home/Home 10-8.webp',
    },
    {
        id: 9,
        image: '/assets/images/home/Home 10-9.webp',
    },
    {
        id: 10,
        image: '/assets/images/home/Home 10-10.webp',
    },
    {
        id: 11,
        image: '/assets/images/home/Home 10-11.webp',
    },
    {
        id: 12,
        image: '/assets/images/home/Home 10-12.webp',
    },
];

export const menuSlides: CommonSlide[] = [
    {
        id: 1,
        image: '/assets/images/menu/Menu 1.webp',
    },
    {
        id: 2,
        image: '/assets/images/menu/Menu 2.webp',
    },
    {
        id: 3,
        image: '/assets/images/menu/Menu 3.webp',
    },
    {
        id: 4,
        image: '/assets/images/menu/Menu 4.webp',
    },
    {
        id: 5,
        image: '/assets/images/menu/Menu 5.webp',
    },
    {
        id: 6,
        image: '/assets/images/menu/Menu 6.webp',
    },
    {
        id: 7,
        image: '/assets/images/menu/Menu 7.webp',
    },
    {
        id: 8,
        image: '/assets/images/menu/Menu 8.webp',
    },
    {
        id: 9,
        image: '/assets/images/menu/Menu 9.webp',
    },
    {
        id: 10,
        image: '/assets/images/menu/Menu 10.webp',
    },
    {
        id: 11,
        image: '/assets/images/menu/Menu 11.webp',
    },
    {
        id: 12,
        image: '/assets/images/menu/Menu 12.webp',
    },
    {
        id: 13,
        image: '/assets/images/menu/Menu 13.webp',
    },
    {
        id: 14,
        image: '/assets/images/menu/Menu 14.webp',
    },
    {
        id: 15,
        image: '/assets/images/menu/Menu 15.webp',
    },
    {
        id: 16,
        image: '/assets/images/menu/Menu 16.webp',
    },
    {
        id: 17,
        image: '/assets/images/menu/Menu 17.webp',
    },
    {
        id: 18,
        image: '/assets/images/menu/Menu 18.webp',
    },
    {
        id: 19,
        image: '/assets/images/menu/Menu 19.webp',
    },
    {
        id: 20,
        image: '/assets/images/menu/Menu 20.webp',
    }
];

export interface BlogSlide {
    id: string;
    title: string;
    date: string;
    author: string;
    excerpt: string;
    readMore: string;
    image: string;
}

export const blogSlides: BlogSlide[] = [
    {
        id: '2dfd23dft3edffsecew323',
        title: "10 Reasons to Do a Digital Detox Challenge",
        date: "Feb 14, 2024",
        author: "Admin",
        excerpt: `
        <p>Modern life is full of noise, distractions, and screen time. Taking a digital detox gives your mind space to breathe and helps you reconnect—with nature, yourself, and the people around you.</p>
        <ul class="list-disc pl-5 mt-2 text-gray-600 text-sm leading-relaxed">
            <li>Improved mental clarity</li>
            <li>Better sleep patterns</li>
            <li>Deeper personal connections</li>
            <li>More time to explore your surroundings</li>
        </ul>
        `,
        readMore: `
        In today’s hyperconnected world, we’re constantly surrounded by screens—phones, tablets, laptops, and more. While technology keeps us informed and entertained, it also overwhelms our minds, clouds our focus, and robs us of meaningful presence. That’s where a digital detox comes in. Taking time to unplug can significantly improve your mental and emotional well-being, and there’s no better place to do it than at Salt Mirissa.
        <br/><br/>
        One of the most immediate benefits of a digital detox is mental clarity. Without the constant stream of notifications and distractions, your thoughts become clearer, your focus sharper. Better sleep is another gift of going offline—your body returns to its natural rhythm without the blue light of screens disrupting your rest. Relationships also deepen when you’re truly present. Instead of scrolling through social media at the dinner table, you’ll enjoy heartfelt conversations with those around you.
        <br/><br/>
        Productivity and creativity both thrive when your attention isn’t scattered. Without endless information and input, your brain gets space to generate fresh ideas and new perspectives. Your overall mood lifts as anxiety decreases, and you begin to develop healthier habits—like moving more, eating mindfully, and spending more time in nature.
        <br/><br/>
        Salt Mirissa provides the perfect backdrop for this transformation. Here, you can fall asleep to the sound of waves, take early morning walks on the beach, and enjoy long, undistracted meals prepared with care by our chefs. Without screens, every meal becomes a sensory experience, every sunset a memory that lasts.
        <br/><br/>
        A digital detox doesn’t mean giving up—it means gaining more of what really matters. Reconnect with nature, with others, and with yourself. Your mind and body will thank you for it.
        `,
        image: "/assets/images/blog/blog 1.webp",
    },
    {
        id: '23fd23dft3edffssdfdfe23',
        title: "8 Ways to Make the Most of Your Beach Stay at Salt Mirissa",
        date: "Jan 22, 2024",
        author: "Admin",
        excerpt: `
        <p>From sunrise yoga to fresh seafood feasts, Salt Mirissa offers more than just a stay—it offers an experience. Discover how to soak up every moment of your coastal escape.</p>
        <ul class="list-disc pl-5 mt-2 text-gray-600 text-sm leading-relaxed">
            <li>Wake up with the sound of waves</li>
            <li>Try authentic Sri Lankan cuisine</li>
            <li>Watch the sunset from Coconut Tree Hill</li>
            <li>Indulge in a relaxing beachfront massage</li>
        </ul>
        `,
        readMore: `
        Salt Mirissa is more than just a beachfront retreat—it’s a place to slow down, breathe deep, and truly experience life by the sea. If you’re planning a stay with us, here are eight simple ways to get the most out of your time here.
        <br/><br/>
        Start your day with nature. Wake up to the gentle sound of waves crashing just outside your room. There’s something deeply calming about being in sync with the ocean’s rhythm. For breakfast, take your time. Savor fresh tropical fruits, warm pastries, and a good cup of Ceylon tea, all while enjoying the sea breeze and morning sun.
        <br/><br/>
        Be sure to dine by the ocean at least once during your stay. Whether it’s a candlelit dinner or a casual seafood lunch, eating with the sea view is a magical experience. If you’re feeling adventurous, sign up for a surf lesson—our skilled instructors make it safe and fun, whether you’re a beginner or just brushing up on your skills.
        <br/><br/>
        When you're not in the water, explore the nearby gems. A short walk will take you to Coconut Tree Hill or the hidden beauty of Secret Beach. After a day under the sun, cool off in our upper-floor air-conditioned lounge. It’s the perfect place to read, sip on a chilled drink, or just relax in comfort.
        <br/><br/>
        Don’t forget to take photos—but also remember to put your phone down. Soak in the real moments. Let the waves remind you what it feels like to be present. At Salt Mirissa, the beach isn’t just a destination, it’s a way of life. Come for the view, stay for the peace.

        `,
        image: "/assets/images/blog/blog 2.webp",
    },
    {
        id: 'dcfe253fcee23536cfdd2dc',
        title: "Why Salt Mirissa is Perfect for Your Next Romantic Getaway",
        date: "Mar 08, 2024",
        author: "Admin",
        excerpt: `
        <p>Looking for a place to reconnect, relax, and rekindle? Salt Mirissa offers the perfect mix of privacy, beauty, and warm hospitality to make your romantic escape unforgettable.</p>
        <ul class="list-disc pl-5 mt-2 text-gray-600 text-sm leading-relaxed">
            <li>Sunset walks on the beach</li>
            <li>Candlelit dinners by the ocean</li>
            <li>Cozy, stylish rooms for two</li>
            <li>Stargazing from your balcony</li>
        </ul>
        `,
        readMore: `
        If you are looking for a peaceful and intimate escape with your partner, Salt Mirissa is the perfect destination. Located along the beautiful southern coast of Sri Lanka, Salt offers the kind of calm, comfort, and charm that makes a romantic getaway truly special.
        <br/><br/>
        From the moment you arrive, you are welcomed by the sound of the ocean and the soft breeze that moves through the palm trees. Take long walks on the beach, hand in hand, as the sky changes colors at sunset. These quiet moments set the tone for a stay that is both relaxing and memorable.
        <br/><br/>
        Our rooms are designed with couples in mind. Each space combines cozy textures, warm lighting, and tasteful design to create a private retreat. Enjoy your morning coffee on the balcony or unwind together under the stars. Whether it is your honeymoon, anniversary, or a simple weekend escape, you will find the perfect atmosphere here.
        <br/><br/>
        Dining at Salt adds an extra layer of romance. Enjoy candlelit dinners beside the sea, where each dish is made with care using fresh local ingredients. Our team is happy to help you arrange special experiences like private beachside meals, floral touches, or a toast during sunset.
        <br/><br/>
        Salt Mirissa is a place where you can pause, reconnect, and create lasting memories together. From the beauty of the beach to the comfort of your room, every detail is designed to make your romantic getaway unforgettable.
        `,
        image: "/assets/images/blog/blog 3.webp",
    },
    {
        id: 'dfce2367dfecw32decew323',
        title: "A Food Lover’s Guide to Dining at Salt Mirissa",
        date: "Apr 02, 2024",
        author: "Admin",
        excerpt: `
        <p>Salt Mirissa is a haven for food lovers. From fresh seafood to plant-based dishes, every meal is a celebration of local flavor and thoughtful cooking.</p>
        <ul class="list-disc pl-5 mt-2 text-gray-600 text-sm leading-relaxed">
            <li>Chef’s daily seafood special</li>
            <li>Tropical fruit platters at breakfast</li>
            <li>Beachside barbecue nights</li>
            <li>Homemade desserts that wow</li>
        </ul>
        `,
        readMore: `
        If you love food and travel, Salt Mirissa is the perfect place to enjoy both. Here, dining is more than just eating. It is about fresh ingredients, local flavors, and carefully prepared meals that reflect the spirit of the island.
        <br/><br/>
        Your day begins with a bright and flavorful breakfast. From tropical fruit platters and freshly baked bread to warm local dishes and rich Ceylon tea, mornings at Salt are made to be savored. You can choose to eat by the beach or in one of our relaxed indoor spaces, where the atmosphere is as inviting as the food.
        <br/><br/>
        For lunch and dinner, our menu focuses on seasonal ingredients and coastal favorites. Seafood is a highlight, with dishes prepared using the freshest catch of the day. Whether you enjoy grilled fish, spicy curries, or something simple and satisfying, our chefs make sure each meal is full of flavor. We also offer a variety of plant-based options that are just as bold and delicious.
        <br/><br/>
        In the evening, our beachside barbecue nights create a relaxed and social vibe. Enjoy your meal under the stars, with the sound of waves in the background and the scent of spices in the air. Finish your dining experience with one of our homemade desserts, from tropical-inspired treats to rich chocolate indulgences.
        <br/><br/>
        At Salt Mirissa, food is at the heart of your stay. It brings people together, reflects the beauty of the region, and adds joy to every moment. Whether you are a passionate foodie or just enjoy a good meal, your taste buds will feel right at home here.
        `,
        image: "/assets/images/blog/blog 4.webp",
    }
]
