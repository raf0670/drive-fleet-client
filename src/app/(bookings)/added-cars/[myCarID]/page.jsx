import MyAddedCarEditPage from "@/components/MyAddedCarEditPage";
import { getCarDetailByID } from "@/utils/data";
import Link from "next/link";
import { CarFront } from "lucide-react";

export default async function AddedCarEditRoute({ params }) {
    const { myCarID } = await params;
    const car = await getCarDetailByID(myCarID);

    if (!car?._id) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 flex items-center justify-center">
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md p-8">
                    <CarFront className="h-10 w-10 text-slate-400 mx-auto mb-4" />
                    <p className="font-bold text-slate-800 dark:text-slate-200">Car not found</p>
                    <Link
                        href="/added-cars"
                        className="inline-block mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Back to My Added Cars
                    </Link>
                </div>
            </div>
        );
    }

    return <MyAddedCarEditPage car={JSON.parse(JSON.stringify(car))} />;
}
