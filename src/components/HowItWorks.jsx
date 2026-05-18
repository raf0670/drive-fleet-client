import { Search, CalendarDays, KeyRound } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            icon: <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
            title: "1. Choose Your Car",
            desc: "Browse our extensive fleet of verified, high-quality vehicles matching your exact budget and taste thresholds."
        },
        {
            icon: <CalendarDays className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
            title: "2. Select Dates & Pick-up",
            desc: "Pick your rental timeline duration and select your preferred convenient pickup location point."
        },
        {
            icon: <KeyRound className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
            title: "3. Drive Safely",
            desc: "Complete our secure validation checkout process, collect your keys, and hit the open highway safely."
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Process Flow</span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1 mb-12">Rent In 3 Easy Steps</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mx-auto">
                                {step.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}