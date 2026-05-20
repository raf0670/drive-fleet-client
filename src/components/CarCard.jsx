"use client";

import Link from "next/link";
import { MapPin, Users, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";

export default function CarCard({ car }) {
    const { _id, carName, dailyPrice, carType, imageUrl, seatCapacity, pickupLocation, description, availabilityStatus } = car;

    const isAvailable = availabilityStatus?.toLowerCase() === "available";

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group h-full">

            <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                <Image
                    height={1000}
                    width={1000}
                    src={imageUrl}
                    alt={carName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                    <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${isAvailable
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                            }`}
                    >
                        {isAvailable ? (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        ) : (
                            <XCircle className="h-3.5 w-3.5 shrink-0" />
                        )}
                        <span>{availabilityStatus}</span>
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col grow justify-between">
                <div className="space-y-3">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            {carType}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 line-clamp-1">
                            {carName}
                        </h3>
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
                        {description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-2 text-slate-600 dark:text-slate-300 text-sm font-medium border-t border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-slate-400" />
                            <span>{seatCapacity} Seats</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-slate-400 truncate" />
                            <span className="truncate">{pickupLocation}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                    <div>
                        <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                            ${dailyPrice}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                            {" "}/ day
                        </span>
                    </div>

                    <Link
                        href={`/cars/${_id}`}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-all shadow-sm"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}