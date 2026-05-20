import CarDetail from '@/components/CarDetail';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const CarDetailsPage = async ({ params }) => {
    const { carID } = await params;

    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${carID}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );

    const car = await res.json();
    return (
        <div>
            <CarDetail car={car}></CarDetail>
        </div>
    );
};

export default CarDetailsPage;