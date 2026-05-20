export const getFeaturedCars = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/featured`);
    return res.json();
};

export const getAllCars = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`);
    return res.json();
};

export const getCarDetailByID = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`);
    return res.json();
};

export const getBookingsByUserID = async (userID) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${userID}`)
    return res.json();
};