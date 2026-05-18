import CarDetail from '@/components/CarDetail';
import { getCarDetailByID } from '@/utils/data';
import React from 'react';

const CarDetailsPage = async ({ params }) => {
    const { carID } = await params;
    const car = await getCarDetailByID(carID);

    return (
        <div>
            <CarDetail car={car}></CarDetail>
        </div>
    );
};

export default CarDetailsPage;