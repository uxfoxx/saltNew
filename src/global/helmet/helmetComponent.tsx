import React from 'react';
import { Helmet } from 'react-helmet';

interface HelmetComponentProps {
    title: string;
}

const HelmetComponent: React.FC<HelmetComponentProps> = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default HelmetComponent;
