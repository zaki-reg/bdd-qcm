"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { ReactNode } from "react";

// Easing presets - as tuple for proper typing
const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Animation variants
const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const scaleInVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
};

const staggerContainerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

// Base props interface
interface MotionWrapperProps extends Omit<HTMLMotionProps<"div">, "variants"> {
    children: ReactNode;
    delay?: number;
    duration?: number;
}

// FadeIn Component
export function FadeIn({
    children,
    delay = 0,
    duration = 0.4,
    ...props
}: MotionWrapperProps) {
    return (
        <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration, delay, ease: "easeOut" }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// FadeInUp Component (slide up with fade)
export function FadeInUp({
    children,
    delay = 0,
    duration = 0.5,
    ...props
}: MotionWrapperProps) {
    return (
        <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration, delay, ease: easeOut }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ScaleIn Component
export function ScaleIn({
    children,
    delay = 0,
    duration = 0.3,
    ...props
}: MotionWrapperProps) {
    return (
        <motion.div
            variants={scaleInVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration, delay, ease: easeOut }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// StaggerContainer Component
interface StaggerContainerProps extends MotionWrapperProps {
    staggerDelay?: number;
}

export function StaggerContainer({
    children,
    staggerDelay = 0.08,
    ...props
}: StaggerContainerProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 1 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.1,
                    },
                },
            }}
            initial="hidden"
            animate="visible"
            {...props}
        >
            {children}
        </motion.div>
    );
}

// StaggerItem Component (for use inside StaggerContainer)
export function StaggerItem({
    children,
    duration = 0.5,
    ...props
}: Omit<MotionWrapperProps, "delay">) {
    return (
        <motion.div
            variants={fadeInUpVariants}
            transition={{ duration, ease: easeOut }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Interactive Card Component
interface MotionCardProps extends MotionWrapperProps {
    hoverScale?: number;
    tapScale?: number;
}

export function MotionCard({
    children,
    hoverScale = 1.02,
    tapScale = 0.98,
    delay = 0,
    duration = 0.3,
    ...props
}: MotionCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration, delay, ease: easeOut }}
            whileHover={{ scale: hoverScale, transition: { duration: 0.2 } }}
            whileTap={{ scale: tapScale, transition: { duration: 0.1 } }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Re-export motion for direct use
export { motion, AnimatePresence } from "framer-motion";
