import CarCard from "./CarCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeatured } from "@/utils/data";

export default async function FeaturedCars() {
    const cars = await getFeatured();

    return (
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Heading Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                            Explore Options
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                            Our Featured Vehicles
                        </h2>
                    </div>
                    <Link
                        href="/explore"
                        className="group inline-flex items-center space-x-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                    >
                        <span>See all available vehicles</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Populated Main Production Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((item) => (
                        <CarCard key={item._id} car={item} />
                    ))}
                </div>

            </div>
        </section>
    );
}