export const getFeaturedCars = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/featured`);
    return res.json();
};

export const getAllCars = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`);
    return res.json();
};