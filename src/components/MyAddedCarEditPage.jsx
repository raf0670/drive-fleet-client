"use client";

import { authClient } from "@/lib/auth-client";
import { ArrowLeft, CarFront, DollarSign, FileText, Image as ImageIcon, Layers, MapPin, Save, Users, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


export default function MyAddedCarEditPage({ car }) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

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
        addedBy,
    } = car;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            carName: carName ?? "",
            dailyPrice: dailyPrice ?? "",
            carType: carType ?? "Sedan",
            imageUrl: imageUrl ?? "",
            seatCapacity: seatCapacity ?? "",
            pickupLocation: pickupLocation ?? "",
            description: description ?? "",
            availabilityStatus: availabilityStatus ?? "Available",
        },
    });

    const onSubmit = async (data) => {
        const payload = {
            carName: data.carName,
            dailyPrice: Number(data.dailyPrice),
            carType: data.carType,
            imageUrl: data.imageUrl?.trim() || FALLBACK_IMAGE,
            seatCapacity: Number(data.seatCapacity),
            pickupLocation: data.pickupLocation,
            description: data.description,
            availabilityStatus: data.availabilityStatus,
            bookingCount: bookingCount ?? 0,
            addedBy: addedBy ?? user?.id ?? "",
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${_id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        toast.success(`${data.carName} has been updated!`);
        redirect("/added-cars");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-3xl mx-auto space-y-6">
                <Link
                    href="/added-cars"
                    className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to My Added Cars</span>
                </Link>

                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-xl">
                    <div className="bg-slate-900 dark:bg-slate-950 p-6 text-white flex items-center gap-4">
                        <div className="h-16 w-24 shrink-0 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                            <Image
                                src={imageUrl || FALLBACK_IMAGE}
                                alt={carName}
                                width={96}
                                height={64}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-lg font-black tracking-tight truncate">
                                Edit listing
                            </h1>
                            <p className="text-[11px] text-slate-400 truncate">{carName}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <CarFront className="h-3 w-3 mr-1" /> Vehicle name
                                </label>
                                <input
                                    type="text"
                                    {...register("carName", { required: true })}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl outline-none focus:border-blue-500"
                                />
                                {errors.carName && (
                                    <span className="text-[10px] font-bold text-rose-500">Required</span>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <Layers className="h-3 w-3 mr-1" /> Type
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

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <DollarSign className="h-3 w-3 mr-1" /> Daily price ($)
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    {...register("dailyPrice", { required: true })}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl outline-none focus:border-blue-500"
                                />
                                {errors.dailyPrice && (
                                    <span className="text-[10px] font-bold text-rose-500">Required</span>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <Users className="h-3 w-3 mr-1" /> Seats
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    {...register("seatCapacity", { required: true })}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl outline-none focus:border-blue-500"
                                />
                                {errors.seatCapacity && (
                                    <span className="text-[10px] font-bold text-rose-500">Required</span>
                                )}
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" /> Pickup location
                                </label>
                                <input
                                    type="text"
                                    {...register("pickupLocation", { required: true })}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl outline-none focus:border-blue-500"
                                />
                                {errors.pickupLocation && (
                                    <span className="text-[10px] font-bold text-rose-500">Required</span>
                                )}
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <ImageIcon className="h-3 w-3 mr-1" /> Image URL
                                </label>
                                <input
                                    type="url"
                                    {...register("imageUrl")}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs rounded-xl outline-none focus:border-blue-500 font-mono"
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Availability
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {["Available", "Unavailable"].map((status) => (
                                        <label
                                            key={status}
                                            className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center space-x-2.5 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300"
                                        >
                                            <input
                                                type="radio"
                                                value={status}
                                                {...register("availabilityStatus")}
                                                className="accent-blue-600 h-3.5 w-3.5"
                                            />
                                            <span>{status}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                                    <FileText className="h-3 w-3 mr-1" /> Description
                                </label>
                                <textarea
                                    rows={4}
                                    {...register("description")}
                                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs rounded-xl outline-none focus:border-blue-500 resize-none leading-relaxed"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                            <Link
                                href="/added-cars"
                                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                            >
                                <Save className="h-4 w-4" />
                                <span>{isSubmitting ? "Saving…" : "Save changes"}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
