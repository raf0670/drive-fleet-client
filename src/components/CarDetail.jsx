"use client"
import { ArrowLeft, CarFront, CheckCircle2, Layers, MapPin, Pencil, Trash2, Users, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CarDetail = ({ car }) => {
    const {
        _id,
        carName,
        dailyPrice,
        carType,
        imageUrl,
        seatCapacity,
        pickupLocation,
        description,
        availabilityStatus,
        bookingCount,
    } = car;

    const isAvailable = availabilityStatus === "Available";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Navigation Toolbar Link Row */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/explore"
                        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Fleet Catalogue</span>
                    </Link>

                    {/* CONTROL INTERFACE PANEL: Edit & Delete Action Placeholders */}
                    <div className="flex items-center space-x-3">
                        {/* Edit Button Placeholder */}
                        <button
                            type="button"
                            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xs"
                            onClick={() => console.log("Edit route triggered for ID:", _id)}
                        >
                            <Pencil className="h-3.5 w-3.5 text-blue-500" />
                            <span>Edit</span>
                        </button>

                        {/* Delete Button Placeholder */}
                        <button
                            type="button"
                            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-xl hover:bg-rose-100 dark:hover:bg-rose-950/60 transition-all shadow-xs"
                            onClick={() => console.log("Delete verification step triggered for ID:", _id)}
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>

                {/* Main Grid Wrapper Layout Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-xl">

                    {/* LEFT SIDE COLUMN: High-Definition Vehicle Imagery Showcase */}
                    <div className="lg:col-span-7 relative bg-slate-100 dark:bg-slate-950 min-h-[320px] sm:min-h-[440px] flex items-center justify-center p-6">
                        <Image
                            src={imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"}
                            alt={carName}
                            height={1000}
                            width={1000}
                            className="w-full h-full object-contain max-h-100 drop-shadow-xl"
                        />

                        {/* Overlay Status Badge Layer */}
                        <div className="absolute top-6 left-6">
                            <span className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md ${isAvailable
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-400 dark:bg-slate-800 text-white"
                                }`}>
                                {isAvailable ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                                <span>{availabilityStatus}</span>
                            </span>
                        </div>
                    </div>

                    {/* RIGHT SIDE COLUMN: Comprehensive Vehicle Descriptive Analytics */}
                    <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-8">

                        {/* Core Metadata Frame */}
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    {carType} Collection
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
                                    {carName}
                                </h1>
                            </div>

                            {/* Price Tag Hero Block */}
                            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 flex items-baseline space-x-1">
                                <span className="text-2xl font-black text-slate-900 dark:text-white">${dailyPrice}</span>
                                <span className="text-xs font-semibold text-slate-400">/ operational daily rent rate</span>
                            </div>

                            {/* Grid Specifications Box */}
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                {/* Metric 1: Capacity */}
                                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl">
                                        <Users className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Capacity</p>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">{seatCapacity} Seating Rows</p>
                                    </div>
                                </div>

                                {/* Metric 2: Operational Location Hub */}
                                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl">
                                        <MapPin className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location Hub</p>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-35">{pickupLocation}</p>
                                    </div>
                                </div>

                                {/* Metric 3: Total Booking Iterations */}
                                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl">
                                        <Layers className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bookings</p>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">{bookingCount || 0} Times Secured</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Paragraph Text Description Layer */}
                        <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Premium Fleet Specifications & Overview
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                                {description || "No customized descriptive profiles have been logged inside the asset portfolio for this vehicle entity."}
                            </p>
                        </div>

                        {/* Bottom Primary Interactive Call To Action Row */}
                        <div className="pt-4">
                            <button
                                type="button"
                                disabled={!isAvailable}
                                className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                            >
                                <CarFront className="h-4 w-4" />
                                <span>{isAvailable ? "Book This Vehicle Now" : "Currently Booked Out"}</span>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CarDetail;