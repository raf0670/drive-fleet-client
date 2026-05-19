import { Compass, MoveLeft, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
            <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">

                {/* Visual Identity 404 Display */}
                <div className="relative inline-flex items-center justify-center">
                    {/* Glowing structural blur backing */}
                    <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-500/10 rounded-full blur-3xl scale-150" />

                    <h1 className="relative font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-slate-900 to-slate-400 dark:from-white dark:to-slate-700 text-9xl select-none leading-none">
                        404
                    </h1>
                </div>

                {/* Text Context Description Block */}
                <div className="space-y-3 max-w-md mx-auto">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center space-x-2">
                        <Compass className="h-5 w-5 text-blue-600 dark:text-blue-500 animate-pulse" />
                        <span>Route Segment Not Found</span>
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        The resource path you are attempting to address does not map to an active endpoint matrix inside this application. It may have been relocated or purged.
                    </p>
                </div>

                {/* Primary Route Recovery Call-to-Action Link */}
                <div className="pt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md group"
                    >
                        <MoveLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                        <span>Return to Operational Dashboard</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NotFound;