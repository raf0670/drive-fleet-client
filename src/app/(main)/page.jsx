import CtaBanner from '@/components/CtaBanner';
import FeaturedCars from '@/components/FeaturedCars';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <FeaturedCars></FeaturedCars>
            <HowItWorks></HowItWorks>
            <WhyChooseUs></WhyChooseUs>
            <CtaBanner></CtaBanner>
        </div>
    );
};

export default HomePage;