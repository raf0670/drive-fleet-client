"use client"

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const pathname = usePathname();

    // 1. Get the session directly from Better-Auth
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const isLoggedIn = !!session;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        await authClient.signOut({});
        redirect("/login");
    };

    const getLinkStyle = (path) => {
        const isActive = pathname === path;
        return isActive
            ? "text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400 pb-1 text-sm"
            : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm";
    };

    return (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <div className="shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Drive<span className="text-blue-600 dark:text-blue-500"> Fleet</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className={getLinkStyle("/")}>Home</Link>
                        <Link href="/explore" className={getLinkStyle("/explore")}>Explore Cars</Link>
                        {isLoggedIn && (
                            <>
                                <Link href="/add-car" className={getLinkStyle("/add-car")}>Add Car</Link>
                                <Link href="/my-bookings" className={getLinkStyle("/my-bookings")}>My Bookings</Link>
                                <Link href="/added-cars" className={getLinkStyle("/added-cars")}>My Added Cars</Link>
                            </>
                        )}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle></ThemeToggle>
                        {isPending ? (
                            // Skeletal/Loading placeholder while Better-Auth fetches session
                            <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
                        ) : isLoggedIn ? (
                            <div className="relative ml-3" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform duration-200 hover:scale-105"
                                >
                                    <Image
                                        className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                                        src={user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"}
                                        alt={user.name}
                                        width={1000}
                                        height={1000}
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 divide-y divide-slate-100 dark:divide-slate-700 focus:outline-none">
                                        <div className="px-4 py-3">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{user.email}</p>
                                        </div>
                                        <div className="py-1">
                                            <Link href="/add-car" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50">Add Car</Link>
                                            <Link href="/my-bookings" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50">My Bookings</Link>
                                            <Link href="/added-cars" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50">My Added Cars</Link>
                                        </div>
                                        <div className="py-1">
                                            <button onClick={handleLogout} className="w-full text-left block px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-sm transition-all transform hover:-translate-y-0.5">
                                Login
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-2 pt-2 pb-4 space-y-1">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Home</Link>
                    <Link href="/explore" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Explore Cars</Link>

                    {!isPending && (
                        isLoggedIn ? (
                            <div className="border-t border-slate-200 dark:border-slate-700 mt-3 pt-3">
                                <div className="flex items-center px-3 mb-3 space-x-4">
                                    <Image className="h-10 w-10 rounded-full object-cover" src={user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"} width={1000} height={1000} alt={user.name} />
                                    <div className="ml-3">
                                        <p className="text-base font-medium text-slate-800 dark:text-white">{user.name}</p>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{user.email}</p>
                                    </div>
                                    <ThemeToggle></ThemeToggle>
                                </div>
                                <Link href="/add-car" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Add Car</Link>
                                <Link href="/my-bookings" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">My Bookings</Link>
                                <Link href="/added-cars" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">My Added Cars</Link>
                                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 mt-2">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="pt-2 px-3 flex flex-col space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Switch Theme</span>
                                    <ThemeToggle></ThemeToggle>
                                </div>
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                    Login
                                </Link>
                            </div>
                        )
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;