import React from 'react';
import { Loader2, CarFront } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="flex flex-col items-center space-y-6 max-w-sm w-full text-center">

                {/* Dynamic Loading Core Graphic */}
                <div className="relative flex items-center justify-center w-20 h-20">
                    {/* Concentric rotating outer aura ring */}
                    <Loader2 className="absolute h-16 w-16 text-blue-600 dark:text-blue-500 animate-spin stroke-[1.5]" />

                    {/* Bouncing inner core icon indicator */}
                    <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-md animate-pulse">
                        <CarFront className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                    </div>
                </div>

                {/* Micro Skeleton Status Module */}
                <div className="space-y-3 w-full">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-2/3 mx-auto animate-pulse" />
                    <div className="h-3 bg-slate-200/60 dark:bg-slate-800/60 rounded-full w-1/2 mx-auto animate-pulse" />
                </div>

                {/* Decorative Structural Grid Layout (Simulated Skeleton Panel) */}
                <div className="w-full grid grid-cols-3 gap-3 pt-4 opacity-40">
                    {[1, 2, 3].map((index) => (
                        <div
                            key={index}
                            className="h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl animate-pulse"
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}