"use client";

import { authClient } from "@/lib/auth-client";
import { Calendar, Clock, MapPin, Trash2, User, X, } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const STATUS_STYLES = {
    Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    Confirmed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    Approved: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    Completed: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    Cancelled: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

function formatDate(isoDate) {
    if (!isoDate) return "—";
    return new Date(isoDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function getRentalDays(startDate, endDate) {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    return days;
}

export default function BookingCard({ booking }) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const {
        _id,
        carName,
        carImage,
        carType,
        pickupLocation,
        startDate,
        endDate,
        driverNeeded,
        specialNote,
        totalPrice,
        status = "Pending",
    } = booking;

    const rentalDays = getRentalDays(startDate, endDate);
    const statusStyle =
        STATUS_STYLES[status] ??
        "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";

    const handleDelete = async () => {
        if (!_id) return;

        setIsDeleting(true);
        setDeleteError("");

        const {data:tokenData} = await authClient.token()

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${_id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${tokenData?.token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete booking");
        }
        toast.error(`${carName} has been deleted!`);

        setIsModalOpen(false);
        router.refresh();

        setIsDeleting(false);
    };

    return (
        <>
            <article className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                    <Image
                        height={1000}
                        width={1000}
                        src={
                            carImage ||
                            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
                        }
                        alt={carName}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                        <span
                            className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm ${statusStyle}`}
                        >
                            <Clock className="h-3.5 w-3.5 shrink-0" />
                            <span>{status}</span>
                        </span>
                    </div>
                </div>

                <div className="p-5 flex flex-col grow justify-between">
                    <div className="space-y-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                {carType}
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 line-clamp-1">
                                {carName}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5 text-sm">
                            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                                <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                                <span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                                        {formatDate(startDate)}
                                    </span>
                                    <span className="text-slate-400 mx-1.5">→</span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                                        {formatDate(endDate)}
                                    </span>
                                    {rentalDays && (
                                        <span className="text-slate-400 ml-1.5">
                                            ({rentalDays} {rentalDays === 1 ? "day" : "days"})
                                        </span>
                                    )}
                                </span>
                            </div>

                            {pickupLocation && (
                                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                                    <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                                    <span className="truncate">{pickupLocation}</span>
                                </div>
                            )}

                            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                                <User className="h-4 w-4 text-slate-400 shrink-0" />
                                <span>
                                    Driver:{" "}
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                                        {driverNeeded === "Yes" ? "Included" : "Self-drive"}
                                    </span>
                                </span>
                            </div>
                        </div>

                        {specialNote && (
                            <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                                {specialNote}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                        <div>
                            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                                ${totalPrice}
                            </span>
                            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                                {" "}
                                total
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setDeleteError("");
                                setIsModalOpen(true);
                            }}
                            className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 transition-all shadow-sm"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </article>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-slate-900 dark:bg-slate-950 p-5 text-white flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Trash2 className="h-5 w-5 text-rose-500" />
                                <div>
                                    <h2 className="font-black text-base tracking-tight">
                                        Delete Booking
                                    </h2>
                                    <p className="text-[10px] text-slate-400">
                                        This action cannot be undone
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                disabled={isDeleting}
                                className="p-1.5 rounded-lg bg-slate-800 dark:bg-slate-900 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Are you sure you want to cancel and remove your booking for{" "}
                                <span className="font-bold text-slate-900 dark:text-white">
                                    {carName}
                                </span>
                                ? Dates: {formatDate(startDate)} → {formatDate(endDate)}.
                            </p>

                            {deleteError && (
                                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl px-3 py-2">
                                    {deleteError}
                                </p>
                            )}

                            <div className="pt-2 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isDeleting}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center space-x-1.5"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span>{isDeleting ? "Deleting..." : "Confirm Delete"}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
