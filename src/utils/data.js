export const getFeaturedCars = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/featured`);
    return res.json();
};

export const getAllCars = async (search = "", type = "") => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (type) params.append("type", type);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars?${params.toString()}`, {
        cache: "no-store"
    });
    return res.json();
};