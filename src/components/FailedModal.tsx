"use client";

import { Repeat, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    buttonText?: string;
    redirectTo?: string;
}

export default function FailedModal({
    isOpen,
    onClose,
    title = "Kesalahan terjadi",
    description = "Terjadi kesalahan yang menunda petualanganmu!",
    buttonText = "Lanjutkan",
    redirectTo,
}: SuccessModalProps) {
    const router = useRouter();

    const handleContinue = () => {
        onClose();
        if (redirectTo) {
            router.push(redirectTo);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-2xl"
                        >
                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="flex justify-center mb-5 sm:mb-6"
                            >
                                <div className="relative">
                                    {/* Pulsing ring */}
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-red-500 rounded-full"
                                    />
                                    {/* Icon */}
                                    <div className="relative bg-red-500 rounded-full p-3 sm:p-4">
                                        <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-8"
                            >
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    {title}
                                </h3>
                                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                                    {description}
                                </p>
                            </motion.div>

                            {/* Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="relative"
                            >
                                {/* Shadow layer */}
                                <div className="absolute inset-0 bg-violet-700/30 rounded-2xl sm:rounded-3xl translate-y-1.5 blur-sm"></div>

                                {/* Button */}
                                <button
                                    onClick={handleContinue}
                                    className="relative w-full py-3 sm:py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl sm:rounded-3xl font-bold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-lg"
                                >
                                    {buttonText}
                                    <Repeat className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
