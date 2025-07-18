// components/TreeWaveBackground.tsx
import React from 'react';

const TreeWaveBackground: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-transparent overflow-hidden">
                <div
                    className="w-[200%] h-full bg-repeat-x bg-[length:50%_100%] animate-wave-blink"
                    style={{
                        backgroundImage: "url('/assets/images/background/topography.svg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </div>
        </div>
    );
};

export default TreeWaveBackground;
