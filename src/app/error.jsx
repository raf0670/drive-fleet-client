"use client";
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({ reset }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">

                <div className="mx-auto w-16 h-16 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-2xl flex items-center justify-center text-rose-500 shadow-xs">
                    <AlertTriangle className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                        Logistical Execution Fault
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        An unexpected runtime disruption occurred while rendering this segment. The interface layout wrapper successfully contained the breakdown.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Attempt Retry</span>
                    </button>

                    <Link
                        href="/explore"
                        className="inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all"
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span>Return Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}