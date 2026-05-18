import CarCard from '@/components/CarCard';
import { getAllCars } from '@/utils/data';
import React from 'react';

const AllCars = async () => {
    const cars = await getAllCars();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 md:py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Heading Header */}
                <div className="mb-12 border-b border-slate-200/60 dark:border-slate-800/60 pb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                        Complete Fleet Catalogue
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                        Explore All Vehicles
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        Browse through our full directory of available transit options and premium rentals.
                    </p>
                </div>

                {/* Master Responsive Display Grid Viewport */}
                {cars && cars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map((item) => (
                            <CarCard
                                key={item._id.toString()}
                                car={JSON.parse(JSON.stringify(item))}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto p-6">
                        <p className="text-slate-800 dark:text-slate-200 font-bold text-lg">
                            No Vehicles Listed
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                            There are currently no vehicles registered inside the fleet database registry.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AllCars;