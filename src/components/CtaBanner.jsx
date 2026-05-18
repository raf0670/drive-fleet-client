// components/CtaBanner.jsx
import Link from "next/link";

export default function CtaBanner() {
    return (
        <section className="py-16 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-slate-900 px-8 py-12 md:p-16 text-center shadow-xl">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            Ready to Hit the Road with Your Dream Ride?
                        </h2>
                        <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                            Sign up today to manage bookings, track rental history logs, save favorite food and travel destinations, and access premium corporate rates.
                        </p>
                        <div className="pt-4 flex flex-wrap justify-center gap-4">
                            <Link href="/explore" className="px-6 py-3 font-bold text-sm bg-white text-blue-700 hover:bg-slate-50 rounded-xl shadow-md transition-all">
                                Browse Full Fleet
                            </Link>
                            <Link href="/register" className="px-6 py-3 font-bold text-sm border border-white/40 text-white hover:bg-white/10 rounded-xl transition-all">
                                Create Free Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}