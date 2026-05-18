"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Banner() {
    // Animation Variants for orchestrated staggering
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Delays sequential elements smoothly
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 },
        },
    };

    return (
        <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 min-h-[75vh] flex items-center transition-colors duration-300">
            {/* Decorative Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 z-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col space-y-6 text-left"
                    >
                        {/* Small Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full text-xs font-semibold w-fit border border-blue-100 dark:border-blue-900/40"
                        >
                            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                            <span>Drive Your Dreams Today</span>
                        </motion.div>

                        {/* Main Catchy Title */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none"
                        >
                            Find, Book, and <br />
                            <span className="bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                                Drive in Minutes
                            </span>
                        </motion.h1>

                        {/* Short Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-xl font-medium leading-relaxed"
                        >
                            Experience the ultimate freedom of the road. Choose from our premium fleet of hourly and daily rentals with zero hidden fees and instant digital verification.
                        </motion.p>

                        {/* Explore Button */}
                        <motion.div variants={itemVariants} className="pt-2">
                            <Link
                                href="/explore"
                                className="group inline-flex items-center justify-center px-6 py-3.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 text-base"
                            >
                                <span>Explore Our Fleet</span>
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Visual Image with Framer Floating Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.4 }}
                        className="relative flex justify-center items-center"
                    >
                        {/* Glow Accent Sphere Behind Car */}
                        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl -z-10" />

                        {/* Floating Car Wrapper */}
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-full max-w-135"
                        >
                            {/* Using high quality transparent side-profile vehicle display */}
                            <Image
                                width={1000}
                                height={1000}
                                src="https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd"
                                alt="DriveFleet Premium Car"
                                className="w-full h-auto object-contain rounded-2xl shadow-2xl border border-slate-200/60 dark:border-slate-800/60"
                            />
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}