'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const FilterControls = ({ currentSearch, currentType }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(currentSearch);

    // Track multi-select vehicle types as an array
    const [selectedTypes, setSelectedTypes] = useState(
        currentType ? currentType.split(',') : []
    );

    // List of car types available in your fleet database
    const carCategories = ['Compact SUV', 'Full-Size SUV', 'Electric SUV', 'Sedan', 'Sports', 'Sport Sedan', 'Executive Sedan', 'Microbus', 'Van'];

    useEffect(() => {
        // Skip the initial mount run if search is empty to avoid redundant URL state pushes
        if (!search && !searchParams.get('search')) return;

        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (search) {
                params.set('search', search);
            } else {
                params.delete('search');
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [search]); // ONLY track the text string shifts here

    // Handle when checkbox selections change
    const handleTypeChange = (category) => {
        let updatedTypes = [...selectedTypes];
        if (updatedTypes.includes(category)) {
            updatedTypes = updatedTypes.filter(t => t !== category);
        } else {
            updatedTypes.push(category);
        }
        setSelectedTypes(updatedTypes);
        updateUrlParams(search, updatedTypes);
    };

    // Push new parameters smoothly into Next.js router
    const updateUrlParams = (searchText, typeArray) => {
        const params = new URLSearchParams(searchParams.toString());

        if (searchText) {
            params.set('search', searchText);
        } else {
            params.delete('search');
        }

        if (typeArray.length > 0) {
            params.set('type', typeArray.join(',')); // Joins array into "SUV,Sedan"
        } else {
            params.delete('type');
        }

        // Pushes the clean URL (e.g. /cars?search=tesla&type=Electric) without reloading page state
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 shadow-sm mb-10">
            {/* Search Input field */}
            <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Search Fleet
                </label>
                <input
                    type="text"
                    placeholder="Search by vehicle name (e.g., BMW, Corolla)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                />
            </div>

            {/* Filter Checkboxes */}
            <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Filter by Vehicle Type
                </label>
                <div className="flex flex-wrap gap-3">
                    {carCategories.map((category) => {
                        const isChecked = selectedTypes.includes(category);
                        return (
                            <button
                                key={category}
                                onClick={() => handleTypeChange(category)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${isChecked
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/20'
                                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                                    }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FilterControls;