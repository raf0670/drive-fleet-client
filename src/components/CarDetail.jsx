"use client"
import { ArrowLeft, CarFront, CheckCircle2, Layers, MapPin, Pencil, Trash2, Users, XCircle, X, Calendar, FileText, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const CarDetail = ({ car }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    // 1. Initialize react-hook-form with default values
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            startDate: "",
            endDate: "",
            driverNeeded: "No",
            specialNote: ""
        }
    });

    // 2. Watch active fields to calculate pricing dynamics on-the-fly
    // eslint-disable-next-line react-hooks/incompatible-library
    const watchedStartDate = watch("startDate");
    const watchedEndDate = watch("endDate");
    const watchedDriverNeeded = watch("driverNeeded");

    // Session Verification Hooks
    const { data: session } = authClient.useSession();
    const user = session?.user;

    // Live dynamic calculation using watched values
    const calculateTotalPrice = () => {
        if (!watchedStartDate || !watchedEndDate) return dailyPrice;
        const start = new Date(watchedStartDate);
        const end = new Date(watchedEndDate);
        const totalDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
        const baseCost = totalDays * dailyPrice;
        const driverPremium = watchedDriverNeeded === "Yes" ? 20 * totalDays : 0;
        return baseCost + driverPremium;
    };

    // 3. react-hook-form submit handler
    const onSubmitBooking = async (data) => {
        const bookingData = {
            userID: user?.id,
            userName: user?.name,
            userEmail: user?.email,
            carID: _id,
            carName,
            carImage: imageUrl,
            carType,
            pickupLocation,
            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString(),
            driverNeeded: data.driverNeeded,
            specialNote: data.specialNote,
            totalPrice: calculateTotalPrice(),
            status: "Pending"
        };
        const response = await fetch(`http://localhost:5000/bookings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData)
        });

        const newBookingCount = bookingCount + 1;

        const responseBookCountUpdate = await fetch(`http://localhost:5000/cars/${_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingCount: newBookingCount })
        });


        toast.success(`${carName} has been booked under ${user?.name}!`);
        redirect("/my-bookings");
    };

    const onDeleteCar = async () => {
        const res = await fetch(`http://localhost:5000/cars/${_id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        });
        redirect("/explore");
    };

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
                </div>

                {/* Main Grid Wrapper Layout Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-xl">

                    {/* LEFT SIDE COLUMN: Image Showcase */}
                    <div className="lg:col-span-7 relative bg-slate-100 dark:bg-slate-950 min-h-80 sm:min-h-110 flex items-center justify-center p-6">
                        <Image
                            src={imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"}
                            alt={carName}
                            height={1000}
                            width={1000}
                            className="w-full h-full object-contain max-h-100 drop-shadow-xl"
                        />

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

                    {/* RIGHT SIDE COLUMN: Information Panels */}
                    <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-8">
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                    {carType} Collection
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
                                    {carName}
                                </h1>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 flex items-baseline space-x-1">
                                <span className="text-2xl font-black text-slate-900 dark:text-white">${dailyPrice}</span>
                                <span className="text-xs font-semibold text-slate-400">/ operational daily rent rate</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl">
                                        <Users className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Capacity</p>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">{seatCapacity} Seating Rows</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl">
                                        <MapPin className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location Hub</p>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-35">{pickupLocation}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                                    <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl">
                                        <Layers className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bookings</p>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">{bookingCount} Times Secured</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Premium Fleet Specifications & Overview
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                                {description || "No customized descriptive profiles have been logged inside the asset portfolio for this vehicle entity."}
                            </p>
                        </div>

                        {/* Booking Trigger Action Button */}
                        <div className="pt-4">
                            <button
                                type="button"
                                disabled={!isAvailable}
                                onClick={() => setIsModalOpen(true)}
                                className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                            >
                                <CarFront className="h-4 w-4" />
                                <span>{isAvailable ? "Book This Vehicle Now" : "Currently Booked Out"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* POPUP OVERLAY DIALOG MODAL INTERFACE */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                        {/* Modal Header */}
                        <div className="bg-slate-900 dark:bg-slate-950 p-5 text-white flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <CarFront className="h-5 w-5 text-blue-500" />
                                <div>
                                    <h2 className="font-black text-base tracking-tight">Book Car Reservation</h2>
                                    <p className="text-[10px] text-slate-400">Configure parameters for {carName}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1.5 rounded-lg bg-slate-800 dark:bg-slate-900 text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Modal Data Fields Form Wrapper linked to handleSubmit */}
                        <form onSubmit={handleSubmit(onSubmitBooking)} className="p-6 space-y-5">

                            {/* Static Account Read-Only Meta */}
                            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-xl flex items-center space-x-3 text-xs">
                                <User className="h-4 w-4 text-slate-400" />
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-slate-200">Renter: {user?.name}</p>
                                    <p className="text-[10px] text-slate-400">{user?.email}</p>
                                </div>
                            </div>

                            {/* Date Picker Range Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                        <Calendar className="h-3 w-3 mr-1 text-blue-500" /> Start Date
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        {...register("startDate")}
                                        className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                        <Calendar className="h-3 w-3 mr-1 text-blue-500" /> End Date
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        min={watchedStartDate}
                                        {...register("endDate")}
                                        className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Driver Needed (Yes/No Selection Option) */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Driver Assistance Needed?</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {["No", "Yes"].map((option) => (
                                        <label key={option} className={`p-2.5 border rounded-xl flex items-center space-x-2.5 cursor-pointer text-xs font-bold transition-all ${watchedDriverNeeded === option
                                                ? "bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-600 dark:text-blue-400"
                                                : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500"
                                            }`}>
                                            <input
                                                type="radio"
                                                value={option}
                                                {...register("driverNeeded")}
                                                className="accent-blue-600 h-3.5 w-3.5"
                                            />
                                            <span>{option === "Yes" ? "Yes (+ $20/day)" : "No (Self Drive)"}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Special Note Box field */}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <FileText className="h-3 w-3 mr-1 text-slate-400" /> Special Note / Instructions
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Add any specific requests or arrival preferences here..."
                                    {...register("specialNote")}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs rounded-xl outline-none focus:border-blue-500 resize-none"
                                />
                            </div>

                            {/* Price Estimator Summary Display Card */}
                            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 p-3 rounded-xl flex items-center justify-between text-xs">
                                <span className="font-bold text-slate-500">Estimated Invoice total:</span>
                                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                                    ${calculateTotalPrice()}
                                </span>
                            </div>

                            {/* Actions Footer */}
                            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center space-x-1.5"
                                >
                                    <span>Confirm Booking</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarDetail;