"use client";
import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight, CarFront, ShieldCheck } from "lucide-react";
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState(null);
    const router = useRouter();

    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    // Handle Account Registration Submission
    const onSubmit = async (data) => {
        const { name, photo, email, password } = data;

        const { data: res, error } = await authClient.signUp.email({
            name: name, // required
            email: email, // required
            password: password, // required
            image: photo,
            callbackURL: "/",
        },
            {
                onSuccess: () => {
                    router.push("/");
                }
            }
        );

        if (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
            <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 dark:border-slate-800/60 grid grid-cols-1 md:grid-cols-2">

                {/* LEFT SIDE: Brand Showcase & Features (Flipped position to vary look from login) */}
                <div className="hidden md:flex relative bg-slate-900 dark:bg-slate-950 p-12 overflow-hidden flex-col justify-between text-white">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Logo brand */}
                    <div className="relative z-10 flex items-center space-x-2">
                        <CarFront className="h-7 w-7 text-blue-400" />
                        <span className="font-black text-2xl tracking-tight">DriveEase</span>
                    </div>

                    {/* Core App Commitments */}
                    <div className="relative z-10 space-y-6 my-auto max-w-sm">
                        <h2 className="text-2xl font-black tracking-tight text-slate-100">
                            Unlock Your Premium Rental Access Panel
                        </h2>
                        <div className="space-y-4">
                            {[
                                "Real-time vehicle availability validation analytics",
                                "Instant cross-regional pickup destination tracking",
                                "Secure credential verification architectures",
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-start space-x-3 text-sm text-slate-300">
                                    <ShieldCheck className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 text-xs text-slate-500 font-medium">
                        &copy; {new Date().getFullYear()} DriveEase Inc. All rights reserved.
                    </div>
                </div>

                {/* RIGHT SIDE: Interactive Registration Submission Form */}
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                    <div className="space-y-2 mb-6">
                        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 md:hidden mb-4">
                            <CarFront className="h-6 w-6" />
                            <span className="font-black text-xl tracking-tight">DriveEase</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Create Account
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Join us to book vehicles and manage custom trip locations.
                        </p>
                    </div>

                    {/* Server API Error Message Hook Banner */}
                    {serverError && (
                        <div className="mb-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                            {serverError}
                        </div>
                    )}

                    {/* Form Implementation Engine */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

                        {/* Full Name Input Group */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <User className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-sm rounded-xl outline-none transition-all ${errors.name ? "border-rose-500 ring-2 ring-rose-500/10" : "border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                        }`}
                                    {...register("name", { required: "Full name identifier parameter is required" })}
                                />
                            </div>
                            {errors.name && <p className="text-rose-500 text-xs font-medium mt-1 pl-1">{errors.name.message}</p>}
                        </div>

                        {/* Email Input Group */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-sm rounded-xl outline-none transition-all ${errors.email ? "border-rose-500 ring-2 ring-rose-500/10" : "border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                        }`}
                                    {...register("email", {
                                        required: "Email parameter is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Please enter a valid structured email format",
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && <p className="text-rose-500 text-xs font-medium mt-1 pl-1">{errors.email.message}</p>}
                        </div>

                        {/* photo */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                Photo URL
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Photo Link"
                                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-sm rounded-xl outline-none transition-all ${errors.email ? "border-rose-500 ring-2 ring-rose-500/10" : "border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                        }`}
                                    {...register("photo")}
                                />
                            </div>
                            {errors.email && <p className="text-rose-500 text-xs font-medium mt-1 pl-1">{errors.email.message}</p>}
                        </div>

                        {/* Password Input Group */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="h-4 w-4" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-sm rounded-xl outline-none transition-all ${errors.password ? "border-rose-500 ring-2 ring-rose-500/10" : "border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                        }`}
                                    {...register("password", {
                                        required: "Password creation payload string is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters long" },
                                        validate: {
                                            hasUppercase: (value) => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                                            hasLowercase: (value) => /[a-z]/.test(value) || "Password must contain at least one lowercase letter"
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-rose-500 text-xs font-medium mt-1 pl-1">{errors.password.message}</p>}
                        </div>

                        {/* Submit Control Button Layer */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 px-4 mt-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Configuring Account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Alternate Redirection Route Footer Link */}
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Sign In Instead
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;