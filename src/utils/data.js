export const getFeaturedCars = async () => {
    const res = await fetch(`http://localhost:5000/cars/featured`);
    return res.json();
};

export const getAllCars = async () => {
    const res = await fetch(`http://localhost:5000/cars`);
    return res.json();
};