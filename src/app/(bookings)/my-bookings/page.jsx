import BookingCard from "@/components/BookingCard";
import { auth } from "@/lib/auth";
import { CalendarCheck, CarFront } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

const MyBookings = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;
    const id = user?.id;

    const { token } = await auth.api.getToken({
        headers: await headers()
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    )

    const bookings = await res.json();

    const pendingCount = bookings.length;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 md:py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 border-b border-slate-200/60 dark:border-slate-800/60 pb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                        Reservation Dashboard
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                        My Bookings
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        {user?.name
                            ? `Welcome back, ${user.name}. Track and manage your active and past vehicle reservations.`
                            : "Track and manage your active and past vehicle reservations."}
                    </p>

                    {bookings.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                                <CalendarCheck className="h-3.5 w-3.5 text-blue-500" />
                                <span>{bookings.length} total booking{bookings.length !== 1 ? "s" : ""}</span>
                            </span>
                            {pendingCount > 0 && (
                                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-400">
                                    <span>{pendingCount} pending review</span>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {bookings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {bookings.map((item) => (
                            <BookingCard
                                key={item._id?.toString() ?? `${item.carID}-${item.startDate}`}
                                booking={JSON.parse(JSON.stringify(item))}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto p-8">
                        <div className="mx-auto w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                            <CarFront className="h-7 w-7 text-slate-400" />
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 font-bold text-lg">
                            No Bookings Yet
                        </p>
                        <p className="text-slate-400 text-sm mt-1 mb-6">
                            You have not reserved any vehicles. Browse the fleet and book your first ride.
                        </p>
                        <Link
                            href="/explore"
                            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-all shadow-sm"
                        >
                            Explore Vehicles
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
