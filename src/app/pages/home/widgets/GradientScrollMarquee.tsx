import React, { useEffect, useRef } from "react";

const GradientScrollMarquee: React.FC = () => {
    const marqueeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        let posX = 0;
        const speed = 1; // Adjust to control speed

        const animate = () => {
            posX -= speed;

            // Reset position when entire text has moved left
            if (Math.abs(posX) >= marquee.scrollWidth / 2) {
                posX = 0;
            }

            marquee.style.transform = `translateX(${posX}px)`;

            requestAnimationFrame(animate);
        };

        animate();
    }, []);
    // useEffect(() => {
    //     const marquee = marqueeRef.current;
    //     if (!marquee) return;

    //     let posX = -marquee.scrollWidth / 2; // Start off-screen to the left
    //     const speed = 1;

    //     const animate = () => {
    //         posX += speed;

    //         if (posX >= 0) {
    //             posX = -marquee.scrollWidth / 2; // Reset to off-screen again
    //         }

    //         marquee.style.transform = `translateX(${posX}px)`;
    //         requestAnimationFrame(animate);
    //     };

    //     animate();
    // }, []);

    const content = (
        <>
            • Escape to Paradise <span className="dot">•</span> Embrace Luxury{" "}
            <span className="dot">•</span> Create Unforgettable Memories{" "}
        </>
    );

    return (
        <div className="bg-bg-conic-gradient py-5 pointer-events-none overflow-hidden">
            <div className="marquee-wrapper">
                <div className="marquee" ref={marqueeRef}>
                    {content}
                    {content}
                </div>
            </div>
        </div>
    );
};

export default GradientScrollMarquee;
