import AddedCarCard from "@/components/AddedCarCard";
import { auth } from "@/lib/auth";
import { getAllCars } from "@/utils/data";
import { CarFront } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AddedCarsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userId = session?.user?.id;
    const allCars = userId ? await getAllCars() : [];
    const cars = Array.isArray(allCars)
        ? allCars.filter((car) => String(car.addedBy) === String(userId))
        : [];

    // console.log(allCars);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 md:py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 border-b border-slate-200/60 dark:border-slate-800/60 pb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                        Your listings
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                        My Added Cars
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        Vehicles you registered in the catalog.
                    </p>
                </div>

                {cars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map((item) => (
                            <AddedCarCard
                                key={item._id?.toString()}
                                car={JSON.parse(JSON.stringify(item))}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto p-8">
                        <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                            <CarFront className="h-7 w-7 text-slate-400" />
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 font-bold text-lg">
                            No cars yet
                        </p>
                        <p className="text-slate-400 text-sm mt-1 mb-6">
                            Add your first vehicle to see it here.
                        </p>
                        <Link
                            href="/add-car"
                            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-all shadow-sm"
                        >
                            Add a car
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
