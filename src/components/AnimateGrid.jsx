"use client";
import { motion } from "framer-motion";

export default function AnimatedGrid({ children }) {
    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.35,
            },
        },
    };

    return (
        <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {children}
        </motion.div>
    );
}