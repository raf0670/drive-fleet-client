"use client";

import React, { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';
import { ArrowLeft, PlusCircle, CarFront, DollarSign, Users, MapPin, FileText, Image as ImageIcon, Layers } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

const AddCar = () => {
    const router = useRouter();

    // Verify user session
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // React Hook Form initialization
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            carName: "",
            dailyPrice: "",
            carType: "Sedan",
            imageUrl: "",
            seatCapacity: "",
            pickupLocation: "",
            description: "",
            availabilityStatus: "Available"
        }
    });

    // Client form processor firing data directly to Express Backend pipeline
    const onSubmitCar = async (data) => {
        const carData = {
            carName: data.carName,
            dailyPrice: Number(data.dailyPrice),
            carType: data.carType,
            imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
            seatCapacity: Number(data.seatCapacity),
            pickupLocation: data.pickupLocation,
            description: data.description,
            availabilityStatus: data.availabilityStatus,
            bookingCount: 0,
            addedBy: user?.id || "Admin"
        };

        const {data:tokenData} = await authClient.token()

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(carData)
        });

        toast.success(`${data.carName} has been added!`);

        reset();
        redirect("/added-cars");
        // router.push("/added-cars");
    };

    if (isPending) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-950 text-xs font-bold">Verifying Workspace Identity...</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Back Link */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/explore"
                        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Cancel and return to Catalogue</span>
                    </Link>
                </div>

                {/* Main Input Card Layout Container */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-xl">

                    {/* Form Identity Heading block */}
                    <div className="bg-slate-900 dark:bg-slate-950 p-6 text-white flex items-center space-x-3">
                        <div className="p-2.5 bg-slate-800 dark:bg-slate-900 rounded-xl text-blue-500">
                            <CarFront className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black tracking-tight">Register New Fleet Asset</h1>
                            <p className="text-[11px] text-slate-400">Populate technical structural properties directly into MongoDB catalog</p>
                        </div>
                    </div>

                    {/* Registration Entry Field Matrix */}
                    <form onSubmit={handleSubmit(onSubmitCar)} className="p-6 sm:p-8 space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* Car Name Field */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <CarFront className="h-3 w-3 mr-1 text-slate-400" /> Vehicle Model Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Tesla Model Y Long Range"
                                    {...register("carName", { required: true })}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl outline-none focus:border-blue-500"
                                />
                                {errors.carName && <span className="text-[10px] font-bold text-rose-500">Model descriptor identifier field required.</span>}
                            </div>

                            {/* Car Type Selector Select Input */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <Layers className="h-3 w-3 mr-1 text-slate-400" /> Vehicle Classification
                                </label>
                                <select
                                    {...register("carType")}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl outline-none focus:border-blue-500"
                                >
                                    <option value="Sedan">Sedan</option>
                                    <option value="Compact SUV">Compact SUV</option>
                                    <option value="Full-Size SUV">Full-Size SUV</option>
                                    <option value="Electric SUV">Electric SUV</option>
                                    <option value="Sport Sedan">Sport Sedan</option>
                                    <option value="Executive Sedan">Executive Sedan</option>
                                    <option value="Microbus / Van">Microbus / Van</option>
                                </select>
                            </div>

                            {/* Operational Rental Cost Field */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <DollarSign className="h-3 w-3 mr-1 text-slate-400" /> Daily Rent Tariff (USD)
                                </label>
                                <input
                                    type="number"
                                    placeholder="e.g., 95"
                                    min="1"
                                    {...register("dailyPrice", { required: true })}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl outline-none focus:border-blue-500"
                                />
                                {errors.dailyPrice && <span className="text-[10px] font-bold text-rose-500">Numeric tariff declaration required.</span>}
                            </div>

                            {/* Passenger Seating Row Bounds Input */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <Users className="h-3 w-3 mr-1 text-slate-400" /> Passenger Seating Capacity
                                </label>
                                <input
                                    type="number"
                                    placeholder="e.g., 5"
                                    min="1"
                                    {...register("seatCapacity", { required: true })}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl outline-none focus:border-blue-500"
                                />
                                {errors.seatCapacity && <span className="text-[10px] font-bold text-rose-500">Integer seat indexing calculation required.</span>}
                            </div>

                            {/* Geographic Hub Pickup Location Field */}
                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <MapPin className="h-3 w-3 mr-1 text-slate-400" /> Geographic Deployment Hub
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Banani Sector 11, Dhaka"
                                    {...register("pickupLocation", { required: true })}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl outline-none focus:border-blue-500"
                                />
                                {errors.pickupLocation && <span className="text-[10px] font-bold text-rose-500">Geographic dispatch zone declaration tracking point required.</span>}
                            </div>

                            {/* Image Asset CDN URL Field */}
                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <ImageIcon className="h-3 w-3 mr-1 text-slate-400" /> Vector Showcase Image CDN Link
                                </label>
                                <input
                                    type="url"
                                    placeholder="e.g., https://images.unsplash.com/... (leave blank for fallback default image)"
                                    {...register("imageUrl")}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs rounded-xl outline-none focus:border-blue-500 font-mono text-[11px]"
                                />
                            </div>

                            {/* Availability Toggle Field */}
                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Immediate Deployment Availability</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {["Available", "Unavailable"].map((status) => (
                                        <label key={status} className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center space-x-2.5 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                                            <input
                                                type="radio"
                                                value={status}
                                                defaultChecked={status === "Available"}
                                                {...register("availabilityStatus")}
                                                className="accent-blue-600 h-3.5 w-3.5"
                                            />
                                            <span>{status} for bookings</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Technical Description Specification Memo field */}
                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <FileText className="h-3 w-3 mr-1 text-slate-400" /> Premium Specifications & Portfolio Overview
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Detail special internal specs, trim packages, handling properties, engine dynamics, or trunk cargo capacity parameters..."
                                    {...register("description")}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs rounded-xl outline-none focus:border-blue-500 resize-none leading-relaxed"
                                />
                            </div>

                        </div>

                        {/* Actions Control Submission Footer Bar */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                            >
                                <PlusCircle className="h-4 w-4" />
                                <span>Publish Car into System</span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCar;