export const getFeaturedCars = async () => {
    const res = await fetch(`http://localhost:5000/cars/featured`);
    return res.json();
};

export const getAllCars = async () => {
    const res = await fetch(`http://localhost:5000/cars`);
    return res.json();
};

export const getCarDetailByID = async (id) => {
    const res = await fetch(`http://localhost:5000/cars/${id}`);
    return res.json();
};

export const getBookingsByUserID = async (userID) => {
    const res = await fetch(`http://localhost:5000/bookings/${userID}`)
    return res.json();
};