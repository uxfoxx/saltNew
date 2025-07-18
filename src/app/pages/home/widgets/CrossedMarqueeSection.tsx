import React, { useEffect, useRef } from "react";

const CrossedMarquee: React.FC = () => {
    const topRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const animate = (element: HTMLDivElement, direction: "left" | "right") => {
            let posX = direction === "left" ? 0 : -element.scrollWidth / 2;
            const speed = 1;

            const loop = () => {
                posX += direction === "left" ? -speed : speed;

                if (Math.abs(posX) >= element.scrollWidth / 2) {
                    posX = direction === "left" ? 0 : -element.scrollWidth / 2;
                }

                element.style.transform = `translateX(${posX}px)`;
                requestAnimationFrame(loop);
            };

            loop();
        };

        if (topRef.current) animate(topRef.current, "left");
        if (bottomRef.current) animate(bottomRef.current, "right");
    }, []);

    const content = (
        <>
            • Escape to Paradise <span className="dot">•</span> Embrace Luxury{" "}
            <span className="dot">•</span> Create Unforgettable Memories{" "}
        </>
    );

    return (
        <div className="overflow-hidden flex flex-col justify-center md:h-[55vh]">
            <div className="crossed-marquee-container">
                <div className="marquee-strip strip-top">
                    <div className="marquee" ref={topRef}>
                        {content}
                        {content}
                    </div>
                </div>
                <div className="marquee-strip strip-bottom">
                    <div className="marquee" ref={bottomRef}>
                        {content}
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrossedMarquee;
