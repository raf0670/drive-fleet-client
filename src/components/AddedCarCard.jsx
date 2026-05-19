"use client";

import { CheckCircle2, MapPin, Pencil, Trash2, Users, X, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddedCarCard({ car }) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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
    } = car;

    const isAvailable = availabilityStatus?.toLowerCase() === "available";

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`http://localhost:5000/cars/${_id}`, {
                method: "DELETE",
            });
            toast.error(`${carName} has been deleted!`);
            setIsModalOpen(false);
            router.refresh();
        } catch {
            toast.error("Could not delete this car. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
        <article className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                <Image
                    height={1000}
                    width={1000}
                    src={
                        imageUrl ||
                        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={carName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                    <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm ${isAvailable
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
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

            <div className="p-5 flex flex-col grow">
                <div className="grow space-y-3">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            {carType}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 line-clamp-1">
                            {carName}
                        </h3>
                    </div>

                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                            ${dailyPrice}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">/ day</span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
                        <span className="inline-flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-slate-400 shrink-0" />
                            {seatCapacity} seats
                        </span>
                        <span className="inline-flex items-center gap-1.5 min-w-0 max-w-full">
                            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                            <span className="truncate">{pickupLocation}</span>
                        </span>
                    </div>

                    {description && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex gap-2">
                    <Link
                        href={`/added-cars/${_id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-all"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit
                    </Link>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 transition-all"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            </div>
        </article>

        {isModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-slate-900 dark:bg-slate-950 p-5 text-white flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Trash2 className="h-5 w-5 text-rose-500" />
                            <div>
                                <h2 className="font-black text-base tracking-tight">Delete Car</h2>
                                <p className="text-[10px] text-slate-400">This action cannot be undone</p>
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
                            Are you sure you want to remove{" "}
                            <span className="font-bold text-slate-900 dark:text-white">{carName}</span>{" "}
                            from your listings?
                        </p>

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
