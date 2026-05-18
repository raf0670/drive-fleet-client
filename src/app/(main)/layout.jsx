import Banner from '@/components/Banner';
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div>
            <Banner></Banner>
            {children}
        </div>
    );
};

export default MainLayout;