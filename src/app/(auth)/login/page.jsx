"use client";
import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, CarFront } from "lucide-react";
import { redirect } from 'next/navigation';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState(null);

    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Handle Login Form Submission
    const onSubmit = async (data) => {
        try {
            setServerError(null);

            // Replace this with your actual Express.js authentication route endpoint
            const response = await fetch(``, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const resData = await response.json();

            if (!response.ok) {
                throw new Error(resData.message || "Invalid authentication credentials.");
            }

            // Handle successful login here (e.g., save JWT token, redirect to dashboard)
            console.log("Login successful! Token:", resData.token);

            // Example redirect using standard routing window context or next/navigation
            redirect("/");
        } catch (err) {
            setServerError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
            <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 dark:border-slate-800/60 grid grid-cols-1 md:grid-cols-2">

                {/* LEFT SIDE: Authentication Form Panel */}
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                    <div className="space-y-2 mb-8">
                        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 md:hidden mb-4">
                            <CarFront className="h-6 w-6" />
                            <span className="font-black text-xl tracking-tight">DriveEase</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Enter your credentials to access your booking dashboard.
                        </p>
                    </div>

                    {/* Fallback API Server Error Banner */}
                    {serverError && (
                        <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                            {serverError}
                        </div>
                    )}

                    {/* Form Engine */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

                        {/* Email Field Group */}
                        <div className="space-y-1.5">
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
                                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-sm rounded-xl outline-none transition-all ${errors.email
                                            ? "border-rose-500 focus:border-rose-500 ring-2 ring-rose-500/10"
                                            : "border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                        }`}
                                    {...register("email", {
                                        required: "Email path validation parameter is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Please enter a valid structured email address",
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-rose-500 text-xs font-medium mt-1 pl-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field Group */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="h-4 w-4" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-sm rounded-xl outline-none transition-all ${errors.password
                                            ? "border-rose-500 focus:border-rose-500 ring-2 ring-rose-500/10"
                                            : "border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                        }`}
                                    {...register("password", {
                                        required: "Password key payload is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters long",
                                        },
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
                            {errors.password && (
                                <p className="text-rose-500 text-xs font-medium mt-1 pl-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Actions Row Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-slate-400 dark:disabled:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Verifying Credentials...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Bottom Navigation Link */}
                    <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center space-x-0.5"
                        >
                            <span>Register Fleet Account</span>
                        </Link>
                    </p>
                </div>

                {/* RIGHT SIDE: Premium Aesthetic Brand Panel */}
                <div className="hidden md:block relative bg-slate-900 dark:bg-slate-950 p-12 overflow-hidden flex-col justify-between text-white">
                    {/* Subtle Ambient Background Gradients */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Top Logo */}
                    <div className="relative z-10 flex items-center space-x-2 text-white">
                        <CarFront className="h-7 w-7 text-blue-400" />
                        <span className="font-black text-2xl tracking-tight">DriveEase</span>
                    </div>

                    {/* Showcase Callout */}
                    <div className="relative z-10 mt-32 space-y-4">
                        <blockquote className="text-2xl font-semibold leading-snug text-slate-100">
                            &quot;The validation flow and vehicle access setup completely transformed how we plan regional technical site inspections.&quot;
                        </blockquote>
                        <div>
                            <p className="font-bold text-base text-blue-400">Sarah Jenkins</p>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Operations Lead, TechCorp</p>
                        </div>
                    </div>

                    {/* Branding Subtitle Footer */}
                    <div className="relative z-10 mt-40 text-xs text-slate-500 font-medium">
                        &copy; {new Date().getFullYear()} DriveEase Inc. All rights reserved.
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;