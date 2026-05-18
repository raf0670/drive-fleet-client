import { ShieldCheck, BadgeDollarSign, Headphones, CalendarX } from "lucide-react";

export default function WhyChooseUs() {
    const perks = [
        { icon: <ShieldCheck className="text-emerald-500" />, title: "Fully Insured Fleets", desc: "Drive with absolute peace of mind; all bookings include standard comprehensive damage coverage safeguards." },
        { icon: <BadgeDollarSign className="text-blue-500" />, title: "No Hidden Fees", desc: "What you see is exactly what you pay. Transparent daily pricing models with transparent breakdown receipts." },
        { icon: <Headphones className="text-purple-500" />, title: "24/7 Roadside Support", desc: "Our dedicated logistical support center engineers are always standing by to assist your travel emergency calls." },
        { icon: <CalendarX className="text-rose-500" />, title: "Free Cancellation", desc: "Plans shift change unpredictably. Enjoy zero-penalty cancellation rules up to 24 hours prior to booking start timelines." }
    ];

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-1 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Our Premium Perks</span>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Why Hundreds Choose Our Service Fleet</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">We combine pristine vehicle maintenance procedures with cutting-edge software validation layers to make transit rentals smooth.</p>
                    <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-800">
                        <div><p className="text-3xl font-extrabold text-blue-600">10k+</p><p className="text-xs font-medium text-slate-400">Happy Trips</p></div>
                        <div><p className="text-3xl font-extrabold text-blue-600">4.9★</p><p className="text-xs font-medium text-slate-400">Customer Rating</p></div>
                    </div>
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {perks.map((perk, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm flex space-x-4">
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl h-10 w-10 shrink-0 flex items-center justify-center">{perk.icon}</div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-slate-900 dark:text-white text-base">{perk.title}</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{perk.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}